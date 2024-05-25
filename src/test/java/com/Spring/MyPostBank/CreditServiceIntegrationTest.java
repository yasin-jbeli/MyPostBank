package com.Spring.MyPostBank;
import static org.assertj.core.api.Assertions.assertThat;

import com.Spring.MyPostBank.Enums.CreditStatus;
import com.Spring.MyPostBank.Enums.PaymentStatus;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Credit;
import com.Spring.MyPostBank.Models.RepaymentDetail;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CreditRepository;
import com.Spring.MyPostBank.Repositories.RepaymentDetailRepository;
import com.Spring.MyPostBank.Services.AdminServiceImpl;
import com.Spring.MyPostBank.Services.CreditService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@Transactional
public class CreditServiceIntegrationTest {

    @Autowired
    private CreditRepository creditRepository;

    @Autowired
    private BankAccountRepository accountRepository;

    @Autowired
    private RepaymentDetailRepository repaymentDetailRepository;

    @Autowired
    private AdminServiceImpl creditService;

    @Test
    void testApproveCredit() {
        User user = new User();
        user.setId(1);

        BankAccount account = new BankAccount();
        account.setUser(user);
        account.setBalance(new BigDecimal("1000.00"));
        account = accountRepository.save(account);

        Credit credit = new Credit();
        credit.setAmount(new BigDecimal("1200.00"));
        credit.setDuration(12);
        credit.setInterestRate(new BigDecimal("5.00"));
        credit.setStatus(CreditStatus.PENDING);
        credit.setUser(user);
        credit.setAccount(account);
        credit = creditRepository.save(credit);

        creditService.approveCredit(credit.getId());

        Credit updatedCredit = creditRepository.findById(credit.getId()).orElse(null);
        BankAccount updatedAccount = accountRepository.findById(account.getId()).orElse(null);

        assertThat(updatedCredit).isNotNull();
        assertThat(updatedCredit.getStatus()).isEqualTo(CreditStatus.ONGOING);

        assertThat(updatedAccount).isNotNull();
        assertThat(updatedAccount.getBalance()).isEqualByComparingTo(new BigDecimal("2200.00"));

        List<RepaymentDetail> installments = repaymentDetailRepository.findAll();
        assertThat(installments).hasSize(12);
        assertThat(installments.get(0).getPrincipalPayment()).isEqualByComparingTo(new BigDecimal("100.00"));
        assertThat(installments.get(0).getInterestPayment()).isEqualByComparingTo(new BigDecimal("5.00"));
        assertThat(installments.get(0).getPaymentAmount()).isEqualByComparingTo(new BigDecimal("105.00"));
        assertThat(installments.get(0).getPaymentStatus()).isEqualTo(PaymentStatus.NOT_PAID);
    }
}

