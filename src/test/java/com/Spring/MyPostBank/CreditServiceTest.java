package com.Spring.MyPostBank;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

import com.Spring.MyPostBank.Enums.CreditStatus;
import com.Spring.MyPostBank.Enums.PaymentStatus;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.RepaymentDetail;
import com.Spring.MyPostBank.Models.Credit;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CreditRepository;
import com.Spring.MyPostBank.Repositories.RepaymentDetailRepository;
import com.Spring.MyPostBank.Services.AdminServiceImpl;
import com.Spring.MyPostBank.Services.CreditService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.*;

@ExtendWith(MockitoExtension.class)
public class CreditServiceTest {

    @Mock
    private CreditRepository creditRepository;

    @Mock
    private BankAccountRepository accountRepository;

    @Mock
    private RepaymentDetailRepository repaymentDetailRepository;

    @InjectMocks
    private CreditService creditService;
    @InjectMocks
    private AdminServiceImpl adminService;

    private Credit credit;
    private BankAccount account;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId(1);

        account = new BankAccount();
        account.setId(1);
        account.setBalance(new BigDecimal("1000.00"));

        credit = new Credit();
        credit.setId(1);
        credit.setAmount(new BigDecimal("1200.00"));
        credit.setDuration(12);
        credit.setInterestRate(new BigDecimal("5.00"));
        credit.setStatus(CreditStatus.PENDING);
        credit.setUser(user);
        credit.setAccount(account);
    }

    @Test
    void testApproveCredit() {
        when(creditRepository.findById(1)).thenReturn(Optional.of(credit));
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));

        adminService.approveCredit(1);

        verify(creditRepository, times(1)).save(credit);
        verify(accountRepository, times(1)).save(account);
        verify(repaymentDetailRepository, times(1)).saveAll(anyList());

        assertThat(credit.getStatus()).isEqualTo(CreditStatus.ONGOING);
        assertThat(account.getBalance()).isEqualByComparingTo(new BigDecimal("2200.00"));
    }

    @Test
    void testGenerateInstallments() {
        List<RepaymentDetail> installments = adminService.generateInstallments(credit);

        assertThat(installments).hasSize(12);
        assertThat(installments.get(0).getPrincipalPayment()).isEqualByComparingTo(new BigDecimal("100.00"));
        assertThat(installments.get(0).getInterestPayment()).isEqualByComparingTo(new BigDecimal("5.00"));
        assertThat(installments.get(0).getPaymentAmount()).isEqualByComparingTo(new BigDecimal("105.00"));
        assertThat(installments.get(0).getPaymentStatus()).isEqualTo(PaymentStatus.NOT_PAID);
    }

}

