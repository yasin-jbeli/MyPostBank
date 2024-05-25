package com.Spring.MyPostBank;

import static org.mockito.Mockito.*;

import com.Spring.MyPostBank.Enums.PaymentStatus;
import com.Spring.MyPostBank.Exception.InsufficientFunds;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Credit;
import com.Spring.MyPostBank.Models.RepaymentDetail;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Repositories.RepaymentDetailRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;

import com.Spring.MyPostBank.Services.CreditServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class PaymentProcessorTest {

    @Mock
    private RepaymentDetailRepository repaymentDetailRepository;

    @Mock
    private BankAccountRepository accountRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private CreditServiceImpl creditService;

    private RepaymentDetail repaymentDetail;
    private BankAccount bankAccount;

    @BeforeEach
    void setUp() {
        bankAccount = new BankAccount();
        bankAccount.setId(1);
        bankAccount.setBalance(new BigDecimal("1000.00"));

        Credit credit = new Credit();
        credit.setId(1);
        credit.setAccount(bankAccount);

        repaymentDetail = new RepaymentDetail();
        repaymentDetail.setId(1);
        repaymentDetail.setCredit(credit);
        repaymentDetail.setPaymentAmount(new BigDecimal("500.00"));
        repaymentDetail.setDueDate(LocalDate.now());
        repaymentDetail.setPaymentStatus(PaymentStatus.NOT_PAID);
    }

    @Test
    void testProcessDuePayments() throws InsufficientFunds.InsufficientBalanceException {
        List<RepaymentDetail> duePayments = Arrays.asList(repaymentDetail);
        when(repaymentDetailRepository.findByDueDateAndPaymentStatus(any(LocalDate.class), any(PaymentStatus.class)))
                .thenReturn(duePayments);
        creditService.processDuePayments();
        verify(repaymentDetailRepository, times(1)).findByDueDateAndPaymentStatus(any(LocalDate.class), any(PaymentStatus.class));
        verify(accountRepository, times(1)).save(any(BankAccount.class));
        verify(repaymentDetailRepository, times(1)).save(any(RepaymentDetail.class));
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }
}
