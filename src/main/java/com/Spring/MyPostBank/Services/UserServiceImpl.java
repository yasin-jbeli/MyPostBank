package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.Authentication.ChangePasswordRequest;
import com.Spring.MyPostBank.DTOs.UserDetailsDTO;
import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Enums.TransactionType;
import com.Spring.MyPostBank.Exception.OperationNotPermittedException;
import com.Spring.MyPostBank.Handler.BusinessErrorCodes;
import com.Spring.MyPostBank.Models.*;
import com.Spring.MyPostBank.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final BankAccountRepository accountRepository;
    private final CardRepository cardRepository;
    private final TransactionRepository transactionRepository;
    private final TextEncryptor textEncryptor;
    private final NotificationRepository notificationRepository;

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
            throw new OperationNotPermittedException(BusinessErrorCodes.UNAUTHORIZED_ACCESS.getDescription());
        }

        if (sourceAccount.getBalance().compareTo(amount) < 0) {
            throw new OperationNotPermittedException(BusinessErrorCodes.INSUFFICIENT_FUNDS.getDescription());
        }

        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));
        destinationAccount.setBalance(destinationAccount.getBalance().add(amount));

        accountRepository.save(sourceAccount);
        accountRepository.save(destinationAccount);

        Transaction transfer = Transaction.builder()
                .transactionType(TransactionType.TRANSFER)
                .amount(amount)
                .description("Transfer from : " + sourceAccount.getUser().getFirstName() + " " + sourceAccount.getUser().getLastName() + " to: " + destinationAccount.getUser().getFirstName() + " " + destinationAccount.getUser().getLastName() + ".")
                .date(LocalDateTime.now())
                .beneficiary(destinationAccount.getId())
                .accountId(sourceAccount.getId())
                .build();

        transactionRepository.save(transfer);

        Notification not = Notification.builder()
                .message("You received a transfer of amount: " + transfer.getAmount() + "TND, from " + sourceAccount.getUser().getFirstName() + " " + sourceAccount.getUser().getLastName())
                .user(destinationAccount.getUser())
                .isRead(false)
                .build();
        notificationRepository.save(not);

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

    @Override
    public List<Notification> getNot(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        return notificationRepository.findByUserId(user.getId());
    }
}



