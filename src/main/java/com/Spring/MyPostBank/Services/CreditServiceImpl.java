package com.Spring.MyPostBank.Services;


import com.Spring.MyPostBank.DTOs.CreditDTO;
import com.Spring.MyPostBank.DTOs.Mappers.RepaymentDetailMapper;
import com.Spring.MyPostBank.DTOs.RepaymentDetailDTO;
import com.Spring.MyPostBank.Enums.CreditStatus;
import com.Spring.MyPostBank.Enums.DocumentType;
import com.Spring.MyPostBank.Enums.PaymentStatus;
import com.Spring.MyPostBank.Enums.TransactionType;
import com.Spring.MyPostBank.Exception.InsufficientFunds;
import com.Spring.MyPostBank.Models.*;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CreditRepository;
import com.Spring.MyPostBank.Repositories.RepaymentDetailRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.Spring.MyPostBank.DTOs.Mappers.CreditMapper;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CreditServiceImpl implements CreditService{
    private final CreditRepository creditRepository;
    private final FileStorageService fileStorageService;
    private final CreditMapper creditMapper;
    private final RepaymentDetailMapper repaymentDetailMapper;
    private final RepaymentDetailRepository repaymentDetailRepository;
    private final BankAccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public void requestLoan(BigDecimal amount,BigDecimal rate,Integer duration,Integer accountId, Principal connectedUser,MultipartFile applicationForm, MultipartFile bankStatements, MultipartFile proofOfIncome) {

        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        boolean hasOngoingLoan = user.getLoans().stream().anyMatch(loan -> loan.getStatus() == CreditStatus.ONGOING);
        if (hasOngoingLoan) {
            throw new RuntimeException("Ongoing loan has already been requested");
        }
        else {
            boolean hasPaidLoan = user.getLoans().stream().anyMatch(loan -> loan.getStatus() == CreditStatus.PAID);
            Optional<BankAccount> account = accountRepository.findById(accountId);
            Credit credit = Credit.builder()
                    .amount(amount)
                    .interestRate(rate)
                    .duration(duration)
                    .status(CreditStatus.PENDING)
                    .account(account.get())
                    .user(user)
                    .build();
            if (hasPaidLoan) {
                creditRepository.save(credit);
            } else {
                creditRepository.save(credit);
                fileStorageService.saveFile(applicationForm, user.getId(), DocumentType.LOAN);
                fileStorageService.saveFile(bankStatements, user.getId(), DocumentType.LOAN);
                fileStorageService.saveFile(proofOfIncome, user.getId(), DocumentType.LOAN);
            }
        }
    }

    @Override
    public List<CreditDTO> getLoansByUser(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<Credit> credits = creditRepository.findByUser(user);
        return credits.stream()
                .map(creditMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CreditDTO getLoanById(Integer creditId, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Credit credit = creditRepository.findByUserAndId(user, creditId);
        return creditMapper.toDTO(credit);
    }


    @Override
    public CreditDTO getOngoingLoans(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Credit credit = creditRepository.findByUserAndStatus(user, CreditStatus.ONGOING);
        return creditMapper.toDTO(credit);
    }

    public List<RepaymentDetailDTO> getAllRepaymentsByUser(Principal connectedUser, Integer creditId) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Credit credit = creditRepository.findByUserAndId(user, creditId);
        List<RepaymentDetail> allRepayments = repaymentDetailRepository.findAllByUserAndCredit(user,credit);
        return allRepayments.stream()
                .map(repaymentDetailMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<RepaymentDetailDTO> getDuePayments(Principal connectedUser, Integer creditId) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Credit credit = creditRepository.findByUserAndId(user, creditId);
        List<RepaymentDetail> duePayments = repaymentDetailRepository.findByUserAndPaymentStatusAndCredit(user,PaymentStatus.NOT_PAID,credit);
        return duePayments.stream()
                .map(repaymentDetailMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<RepaymentDetailDTO> getPaidPayments(Principal connectedUser, Integer creditId) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Credit credit = creditRepository.findByUserAndId(user, creditId);

        List<RepaymentDetail> paidPayments = repaymentDetailRepository.findByUserAndPaymentStatusAndCredit(user,PaymentStatus.PAID,credit);
        return paidPayments.stream()
                .map(repaymentDetailMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Scheduled(cron = "0 0 0 * * ?")
    public void processDuePayments() {
        LocalDate currentDate = LocalDate.now();

        List<RepaymentDetail> duePayments = repaymentDetailRepository.findByDueDateAndPaymentStatus(currentDate, PaymentStatus.NOT_PAID);

        for (RepaymentDetail payment : duePayments) {
            try {
                processPayment(payment);
            } catch (InsufficientFunds.InsufficientBalanceException e) {
                payment.setPaymentStatus(PaymentStatus.OVERDUE);
                repaymentDetailRepository.save(payment);
            }
        }
    }



    private void processPayment(RepaymentDetail payment) throws InsufficientFunds.InsufficientBalanceException {
        BigDecimal amountToPay = payment.getPaymentAmount();
        BankAccount account = payment.getCredit().getAccount();

        if (account.getBalance().compareTo(amountToPay) < 0) {
            throw new InsufficientFunds.InsufficientBalanceException();
        }

        account.setBalance(account.getBalance().subtract(amountToPay));
        accountRepository.save(account);

        payment.setPaymentStatus(PaymentStatus.PAID);
        repaymentDetailRepository.save(payment);

        Transaction transaction = Transaction.builder()
                .transactionType(TransactionType.CREDIT_INSTALLMENT)
                .amount(amountToPay)
                .description("Payment for Credit ID: " + payment.getCredit().getId())
                .date(LocalDateTime.now())
                .accountId(account.getId())
                .build();

        transactionRepository.save(transaction);
    }
}



