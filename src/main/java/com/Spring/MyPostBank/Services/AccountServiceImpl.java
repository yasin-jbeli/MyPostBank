package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.BankAccountDTO;
import com.Spring.MyPostBank.DTOs.Mappers.BankAccountMapper;
import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Enums.CardStatus;
import com.Spring.MyPostBank.Enums.DocumentType;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Card;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CardRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final BankAccountRepository accountRepository;
    private final CardService cardService;
    private final TextEncryptor textEncryptor;
    private final CardRepository cardRepository;
    private final FileStorageService fileStorageService;
    private final BankAccountMapper accountMapper;


    private final Function<String, String> maskAccountNumber = accountNo -> {
        int maskLength = accountNo.length() - 4;
        if (maskLength <= 0) {
            return accountNo;
        }
        return "X".repeat(maskLength) + accountNo.substring(maskLength);
    };


    @Override
    public void openAccount(Principal connectedUser, AccountType accountType, MultipartFile file) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        String accountNo = textEncryptor.encrypt(banGenerator());
        BankAccount bankAccount = new BankAccount();
        bankAccount.setAccountNo(accountNo);
        bankAccount.setBalance(BigDecimal.ZERO);
        bankAccount.setStatus(AccountStatus.PENDING);
        bankAccount.setAccountType(accountType);
        bankAccount.setUser(user);
        accountRepository.save(bankAccount);
        if (user.getAccounts().isEmpty()) {
            var CIN = fileStorageService.saveFile(file, user.getId(), DocumentType.BANK_ACCOUNT);
        }
    }

    @Override
    public List<BankAccountDTO> getUserAccounts(Principal connectedUser) {
        User user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<BankAccount> userAccounts = accountRepository.findByUserId(user.getId());
        return userAccounts.stream()
                .map(account -> {
                    BankAccountDTO dto = accountMapper.mapToDTO(account);
                    dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public Optional<BankAccountDTO> getAccountById(Integer accountId, Principal connectedUser) {
        User user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Optional<BankAccount> accountOptional = accountRepository.findByIdAndUserId(accountId,user.getId());
        return accountOptional.map(account -> {
            BankAccountDTO dto = accountMapper.mapToDTO(account);
            dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
            return dto;
        });
    }
    @Override
    public Optional<Object> getBalance(Integer accountId, Principal connectedUser) {
        if (connectedUser == null) {
            return Optional.empty();
        }
        User user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        Optional<BankAccount> accountOptional = accountRepository.findByIdAndUserId(accountId, user.getId());

        return accountOptional.map(BankAccount::getBalance);

    }

    @Override
    public void activateAccount(Integer accountId, Principal connectedUser) {
        User user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        BankAccount account = accountRepository.findByIdAndUserId(accountId, user.getId()).get();
        account.setStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);
    }

    @Override
    public void deactivateAccount(Integer accountId, Principal connectedUser) {
        User user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        BankAccount account = accountRepository.findByIdAndUserId(accountId, user.getId()).get();
        account.setStatus(AccountStatus.INACTIVE);
        accountRepository.save(account);
    }

    @Override
    public void deleteAccount(Integer accountId, Principal connectedUser) {
        User user = (User)((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        BankAccount account = accountRepository.findByIdAndUserId(accountId, user.getId()).get();
        if (account.getBalance().equals(BigDecimal.ZERO) || (account.getLoans().isEmpty())) {
            accountRepository.delete(account);
        }
        else {
            throw new RuntimeException("Account is not empty");
        }
    }

    @Override
    public List<BankAccountDTO> getAllAccountsNotAdmin() {
        List<BankAccount> accounts = accountRepository.findAll();
        return accounts.stream()
                .map(account -> {
                    BankAccountDTO dto = accountMapper.mapToDTO(account);
                    dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
                    return dto;
                })
                .collect(Collectors.toList());
    }


    private String banGenerator() {

        StringBuilder accountNumber = new StringBuilder("ACC");

        Random random = new Random();
        for (int i = 0; i < 10 - "ACC".length(); i++) {
            int digit = random.nextInt(10);
            accountNumber.append(digit);
        }

        return accountNumber.toString();

    }
}
