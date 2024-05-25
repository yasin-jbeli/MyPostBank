package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.Authentication.ChangePasswordRequest;
import com.Spring.MyPostBank.DTOs.BankAccountDTO;
import com.Spring.MyPostBank.DTOs.Mappers.BankAccountMapper;
import com.Spring.MyPostBank.DTOs.UserDetailsDTO;
import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Enums.CardStatus;
import com.Spring.MyPostBank.Enums.TransactionType;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Card;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CardRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import com.Spring.MyPostBank.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final BankAccountRepository accountRepository;
    private final CardRepository cardRepository;
    private final TransactionRepository transactionRepository;
    private final TextEncryptor textEncryptor;

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password!");
        }
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same!");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

    }

    @Override
    public User updateUser(Principal connectedUser, User updatedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Optional<User> optionalUser = userRepository.findById(user.getId());

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            if (updatedUser.getFirstName() != null && !updatedUser.getFirstName().isEmpty()) {
                existingUser.setFirstName(updatedUser.getFirstName());
            }
            if (updatedUser.getLastName() != null && !updatedUser.getLastName().isEmpty()) {
                existingUser.setLastName(updatedUser.getLastName());
            }
            if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getPhone() != null && !updatedUser.getPhone().isEmpty()) {
                existingUser.setPhone(updatedUser.getPhone());
            }

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id: " + user.getId());
        }
    }


    @Override
    public boolean deleteUser(Integer userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public void transfer(Principal connectedUser, Integer sourceAccountId, Integer destinationAccountId, BigDecimal amount) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        BankAccount sourceAccount = accountRepository.findById(sourceAccountId)
                .orElseThrow(() -> new IllegalArgumentException("Source account not found"));
        BankAccount destinationAccount = accountRepository.findById(destinationAccountId)
                .orElseThrow(() -> new IllegalArgumentException("Destination account not found"));

        if (!sourceAccount.getUser().getId().equals(user.getId())
                || !sourceAccount.getStatus().equals(AccountStatus.ACTIVE)
                || sourceAccount.getAccountType().equals(AccountType.SAVINGS)) {
            System.out.println("Unauthorized access to source account or invalid account status/type.");
            throw new RuntimeException("Unauthorized access to source account or invalid account status/type.");
        }

        if (sourceAccount.getBalance().compareTo(amount) < 0) {
            System.out.println("Insufficient funds in the source account.");
            throw new RuntimeException("Insufficient funds in the source account.");
        }

        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));
        destinationAccount.setBalance(destinationAccount.getBalance().add(amount));

        System.out.println("Transferring " + amount + " from " + sourceAccountId + " to " + destinationAccountId);

        accountRepository.save(sourceAccount);
        accountRepository.save(destinationAccount);

        Transaction transfer = Transaction.builder()
                .transactionType(TransactionType.TRANSFER)
                .amount(amount)
                .description("Transfer from Account ID: " + sourceAccountId + " to Account ID: " + destinationAccountId)
                .date(LocalDateTime.now())
                .beneficiary(destinationAccount.getId())
                .accountId(sourceAccount.getId())
                .build();
        System.out.println("Saving transaction: " + transfer);
        transactionRepository.save(transfer);

        System.out.println("Transfer completed successfully.");
    }




    @Override
    public ResponseEntity<UserDetailsDTO> getUserDetails(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        List<BankAccount> accounts = accountRepository.findByUserId(user.getId());
        List<Card> cards = cardRepository.findByUserId(user.getId());

        List<String> accountNumbers = accounts.stream()
                .map(BankAccount::getAccountNo)
                .map(textEncryptor::decrypt)
                .toList();

        List<String> cardNumbers = cards.stream()
                .map(Card::getCardNo)
                .map(textEncryptor::decrypt)
                .toList();

        UserDetailsDTO userDetails = UserDetailsDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .accounts(accountNumbers)
                .cards(cardNumbers)
                .role(user.getRole())
                .dateJoined(user.getCreatedDate())
                .build();

        return ResponseEntity.ok(userDetails);
    }


}



