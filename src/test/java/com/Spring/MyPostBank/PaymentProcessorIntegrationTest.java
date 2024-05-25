package com.Spring.MyPostBank;
import static org.assertj.core.api.Assertions.assertThat;

import com.Spring.MyPostBank.Enums.PaymentStatus;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Credit;
import com.Spring.MyPostBank.Models.RepaymentDetail;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CreditRepository;
import com.Spring.MyPostBank.Repositories.RepaymentDetailRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import com.Spring.MyPostBank.Services.CreditServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@Transactional
public class PaymentProcessorIntegrationTest {

    @Autowired
    private RepaymentDetailRepository repaymentDetailRepository;

    @Autowired
    private BankAccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CreditRepository creditRepository;

    @Autowired
    private CreditServiceImpl  paymentProcessor;

    @Test
    void testProcessDuePayments() {
        BankAccount bankAccount = new BankAccount();
        bankAccount.setBalance(new BigDecimal("1000.00"));
        bankAccount = accountRepository.save(bankAccount);

        Credit credit = new Credit();
        credit.setAccount(bankAccount);
        credit = creditRepository.save(credit);

        RepaymentDetail repaymentDetail = new RepaymentDetail();
        repaymentDetail.setCredit(credit);
        repaymentDetail.setPaymentAmount(new BigDecimal("500.00"));
        repaymentDetail.setDueDate(LocalDate.now());
        repaymentDetail.setPaymentStatus(PaymentStatus.NOT_PAID);
        repaymentDetailRepository.save(repaymentDetail);

        paymentProcessor.processDuePayments();

        RepaymentDetail updatedRepaymentDetail = repaymentDetailRepository.findById(repaymentDetail.getId()).orElse(null);
        assertThat(updatedRepaymentDetail).isNotNull();
        assertThat(updatedRepaymentDetail.getPaymentStatus()).isEqualTo(PaymentStatus.PAID);

        BankAccount updatedBankAccount = accountRepository.findById(bankAccount.getId()).orElse(null);
        assertThat(updatedBankAccount).isNotNull();
        assertThat(updatedBankAccount.getBalance()).isEqualTo(new BigDecimal("500.00"));

        List<Transaction> transactions = transactionRepository.findAll();
        assertThat(transactions).hasSize(1);
    }
}

