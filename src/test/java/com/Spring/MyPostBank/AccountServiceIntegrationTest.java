package com.Spring.MyPostBank;
import static org.assertj.core.api.Assertions.assertThat;

import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Enums.TransactionType;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import com.Spring.MyPostBank.Services.AccountServiceImpl;
import com.Spring.MyPostBank.Services.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@Transactional
public class AccountServiceIntegrationTest {

    @Autowired
    private BankAccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserServiceImpl accountService;

    @Test
    void testTransfer() {
        User user = new User();
        user.setId(1);
        Principal connectedUser = new UsernamePasswordAuthenticationToken(user, null);

        BankAccount sourceAccount = new BankAccount();
        sourceAccount.setUser(user);
        sourceAccount.setStatus(AccountStatus.ACTIVE);
        sourceAccount.setAccountType(AccountType.CHECKING);
        sourceAccount.setBalance(new BigDecimal("1000.00"));
        sourceAccount = accountRepository.save(sourceAccount);

        BankAccount destinationAccount = new BankAccount();
        destinationAccount.setBalance(new BigDecimal("500.00"));
        destinationAccount = accountRepository.save(destinationAccount);

        accountService.transfer(connectedUser, sourceAccount.getId(), destinationAccount.getId(), new BigDecimal("200.00"));

        BankAccount updatedSourceAccount = accountRepository.findById(sourceAccount.getId()).orElse(null);
        BankAccount updatedDestinationAccount = accountRepository.findById(destinationAccount.getId()).orElse(null);

        assertThat(updatedSourceAccount).isNotNull();
        assertThat(updatedSourceAccount.getBalance()).isEqualByComparingTo(new BigDecimal("800.00"));

        assertThat(updatedDestinationAccount).isNotNull();
        assertThat(updatedDestinationAccount.getBalance()).isEqualByComparingTo(new BigDecimal("700.00"));

        List<Transaction> transactions = transactionRepository.findAll();
        assertThat(transactions).hasSize(1);
        assertThat(transactions.get(0).getTransactionType()).isEqualTo(TransactionType.TRANSFER);
        assertThat(transactions.get(0).getAmount()).isEqualByComparingTo(new BigDecimal("200.00"));
    }
}

