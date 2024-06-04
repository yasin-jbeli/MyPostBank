package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.*;
import com.Spring.MyPostBank.DTOs.Mappers.*;
import com.Spring.MyPostBank.Enums.*;
import com.Spring.MyPostBank.Models.*;
import com.Spring.MyPostBank.Repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.math.RoundingMode.HALF_UP;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final BankAccountRepository accountRepository;
    private final UserMapper userMapper;
    private final BankAccountMapper accountMapper;
    private final CardRepository cardRepository;
    private final CreditMapper creditMapper;
    private final CreditRepository creditRepository;
    private final CheckBookRepository checkbookRepository;
    private final RepaymentDetailRepository repaymentDetailRepository;
    private final TextEncryptor textEncryptor;
    private final RepaymentDetailMapper repaymentDetailMapper;
    private final TransactionRepository transactionRepository;
    private final NotificationRepository notificationRepository;

    private final Function<String, String> maskAccountNumber = accountNo -> {
        int maskLength = accountNo.length() - 4;
        if (maskLength <= 0) {
            return accountNo;
        }
        return "X".repeat(maskLength) + accountNo.substring(maskLength);
    };



    @Override
    public List<BankAccountDTO> getAllAccounts() {
        List<BankAccount> accounts = accountRepository.findAll();
        return accounts.stream()
                .map(account -> {
                    BankAccountDTO dto = accountMapper.mapToDTO(account);
                    dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public BankAccountDTO getAccountById(Integer accountId) {
        Optional<BankAccount> accountOptional = accountRepository.findById(accountId);
        if (accountOptional.isPresent()) {
            BankAccountDTO dto = accountMapper.mapToDTO(accountOptional.get());
            dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
            return dto;
        } else {
            return null;
        }
    }


    @Override
    public void closeAccount(Integer accountId) {
        if (accountRepository.existsById(accountId)) {
            accountRepository.deleteById(accountId);
        }
    }

    @Override
    @Transactional
    public void activateAccount(Integer accountId) {
        BankAccount account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (account.getStatus() != AccountStatus.PENDING) {
            throw new IllegalStateException("Account is already active or not pending.");
        }

        account.setStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);
        Notification not = Notification.builder()
                .message("Your bank account request with ID: "+account.getId()+", has been approved.")
                .user(account.getUser())
                .isRead(false)
                .build();
        notificationRepository.save(not);
    }


    @Override
    @Transactional
    public void rejectAccount(Integer accountId) {
        Optional<BankAccount> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isPresent()) {
            BankAccount account = optionalAccount.get();
            accountRepository.delete(account);
            Notification not = Notification.builder()
                    .message("Your bank account request with ID: "+account.getId()+", has been rejected.")
                    .user(account.getUser())
                    .isRead(false)
                    .build();
            notificationRepository.save(not);
        }
    }

    public List<BankAccountDTO> getPendingAccounts() {
        List<BankAccount> accounts = accountRepository.findByStatusIn(List.of(AccountStatus.PENDING));
        return accounts.stream()
                .map(account -> {
                    BankAccountDTO dto = accountMapper.mapToDTO(account);
                    dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<BankAccountDTO> getSavingsAccounts() {
        List<BankAccount> accounts = accountRepository.findByAccountTypeIn(List.of(AccountType.SAVINGS));
        return accounts.stream()
                .map(account -> {
                    BankAccountDTO dto = accountMapper.mapToDTO(account);
                    dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<BankAccountDTO> getCheckingAccounts() {
        List<BankAccount> accounts = accountRepository.findByAccountTypeIn(List.of(AccountType.CHECKING));
        return accounts.stream()
                .map(account -> {
                    BankAccountDTO dto = accountMapper.mapToDTO(account);
                    dto.setAccountNo(maskAccountNumber.apply(textEncryptor.decrypt(dto.getAccountNo())));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<CheckbookDTO> getAllCheckbookRequests() {
        List<Checkbook> checkbookRequests = checkbookRepository.findAll();
        return checkbookRequests.stream()
                .map(checkbook -> {
                    String decryptedCheckbookNo = textEncryptor.decrypt(checkbook.getCheckbookNo());
                    checkbook.setCheckbookNo(decryptedCheckbookNo);
                    return CheckbookMapper.toDTO(checkbook);
                })
                .collect(Collectors.toList());
    }


    @Override
    public List<CreditDTO> getAllCreditRequests() {
        List<Credit> creditRequests = creditRepository.findAllByStatus(CreditStatus.PENDING);
        return creditRequests.stream()
                .map(creditMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CreditDTO> getAllLoans() {
        List<Credit> loans = creditRepository.findAll();
        return loans.stream()
                .map(creditMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<RepaymentDetailDTO> getInstallments(Integer creditId) {
        List<RepaymentDetail> installments = repaymentDetailRepository.findByCreditId(creditId);
        return installments.stream()
                .map(repaymentDetailMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void approveCredit(Integer creditId) {
        Credit credit = creditRepository.findById(creditId)
                .orElseThrow(() -> new NoSuchElementException("Credit not found"));
        credit.setStatus(CreditStatus.ONGOING);
        creditRepository.save(credit);
        List<RepaymentDetail> installments = generateInstallments(credit);
        Optional<BankAccount> account = accountRepository.findById(credit.getAccount().getId());
        account.get().setBalance(account.get().getBalance().add(credit.getAmount()));
        accountRepository.save(account.get());
        repaymentDetailRepository.saveAll(installments);
        Transaction trans = Transaction.builder()
                .transactionType(TransactionType.DEPOSIT)
                .amount(credit.getAmount())
                .description("Loan")
                .date(LocalDateTime.now())
                .beneficiary(credit.getAccount().getId())
                .build();
        System.out.println("Saving transaction: " + trans);
        transactionRepository.save(trans);
        Notification not = Notification.builder()
                .message("Your loan request with ID: "+credit.getId()+", has been approved.")
                .user(credit.getUser())
                .isRead(false)
                .build();
        notificationRepository.save(not);

    }

    public List<RepaymentDetail> generateInstallments(Credit credit) {
        List<RepaymentDetail> installments = new ArrayList<>();
        BigDecimal totalAmount = credit.getAmount();
        int numberOfMonths = credit.getDuration();
        BigDecimal interestRate = credit.getInterestRate().divide(BigDecimal.valueOf(100), 2, HALF_UP).add(BigDecimal.ONE);
        BigDecimal principalPayment = totalAmount.divide(BigDecimal.valueOf(numberOfMonths), 2,RoundingMode.HALF_UP);
        BigDecimal interestPayment = principalPayment.multiply(interestRate.subtract(BigDecimal.ONE));
        BigDecimal monthlyPayment = principalPayment.add(interestPayment);
        BigDecimal remainingBalance = credit.getAmount().add(interestPayment.multiply(BigDecimal.valueOf(numberOfMonths)));
        for (int month = 1; month <= numberOfMonths; month++) {
            remainingBalance = remainingBalance.subtract(monthlyPayment);
            RepaymentDetail installment = new RepaymentDetail(
                    credit,
                    credit.getUser(),
                    month,
                    credit.getCreatedDate().toLocalDate().plusMonths(month),
                    principalPayment,
                    interestPayment,
                    remainingBalance,
                    monthlyPayment,
                    PaymentStatus.NOT_PAID
            );
            installments.add(installment);
        }

        return installments;
    }


    @Transactional
    @Override
    public void rejectCredit(Integer creditId) {
        Optional<Credit> optionalCredit = creditRepository.findById(creditId);
        if (optionalCredit.isPresent()) {
            Credit credit = optionalCredit.get();
            creditRepository.delete(credit);
            System.out.println("Credit deleted");
            Notification not = Notification.builder()
                    .message("Your loan request with ID: "+credit.getId()+", has been rejected.")
                    .user(credit.getUser())
                    .isRead(false)
                    .build();
            notificationRepository.save(not);
        } else {
            throw new RuntimeException("Credit with ID " + creditId + " not found");
        }
    }

    @Override
    public void activateCard(Integer cardId) {
        Optional<Card> optionalCard = cardRepository.findById(cardId);
        if (optionalCard.isPresent()) {
            Card card = optionalCard.get();
            card.setStatus(CardStatus.ACTIVE);
            cardRepository.save(card);
        }
    }

    @Override
    public void deactivateCard(Integer cardId) {
        Optional<Card> optionalCard = cardRepository.findById(cardId);
        if (optionalCard.isPresent()) {
            Card card = optionalCard.get();
            card.setStatus(CardStatus.BLOCKED);
            cardRepository.save(card);
        }
    }

    @Override
    public void updateCheckbook(Integer checkId, CheckBookStatus status) {
        Checkbook checkbook = checkbookRepository.findById(checkId).get();
        checkbook.setStatus(status);
        if (status == CheckBookStatus.RECEIVED) {
            checkbookRepository.delete(checkbook);
        } else {
            checkbookRepository.save(checkbook);
        }
    }

    @Override
    public void freezeAccount(Integer accountId) {
        Optional<BankAccount> optionalAccount = accountRepository.findById(accountId);
        if (optionalAccount.isPresent()) {
            BankAccount account = optionalAccount.get();
            account.setStatus(AccountStatus.FROZEN);
            accountRepository.save(account);

            List<Card> cards = cardRepository.findByAccount(account);
            cards.forEach(card -> card.setStatus(CardStatus.FROZEN));
            cardRepository.saveAll(cards);
        }
    }


    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }
        UserMapper userMapper = new UserMapper(); 
        return userMapper.mapToDTO(user);
    }

}



