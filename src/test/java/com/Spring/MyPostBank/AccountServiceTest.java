package com.Spring.MyPostBank;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import com.Spring.MyPostBank.Services.AccountServiceImpl;
import com.Spring.MyPostBank.Services.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {

    @Mock
    private BankAccountRepository accountRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private Principal connectedUser;
    private BankAccount sourceAccount;
    private BankAccount destinationAccount;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId(1);
        connectedUser = new UsernamePasswordAuthenticationToken(user, null);

        sourceAccount = new BankAccount();
        sourceAccount.setId(1);
        sourceAccount.setUser(user);
        sourceAccount.setStatus(AccountStatus.ACTIVE);
        sourceAccount.setAccountType(AccountType.CHECKING);
        sourceAccount.setBalance(new BigDecimal("1000.00"));

        destinationAccount = new BankAccount();
        destinationAccount.setId(2);
        destinationAccount.setBalance(new BigDecimal("500.00"));
    }

    @Test
    void testTransferSuccessful() {
        when(accountRepository.findById(1)).thenReturn(java.util.Optional.of(sourceAccount));
        when(accountRepository.findById(2)).thenReturn(java.util.Optional.of(destinationAccount));

        userService.transfer(connectedUser, 1, 2, new BigDecimal("200.00"));

        verify(accountRepository, times(1)).save(sourceAccount);
        verify(accountRepository, times(1)).save(destinationAccount);
        verify(transactionRepository, times(1)).save(any(Transaction.class));

        assertThat(sourceAccount.getBalance()).isEqualByComparingTo(new BigDecimal("800.00"));
        assertThat(destinationAccount.getBalance()).isEqualByComparingTo(new BigDecimal("700.00"));
    }

    @Test
    void testTransferInsufficientFunds() {
        when(accountRepository.findById(1)).thenReturn(java.util.Optional.of(sourceAccount));
        when(accountRepository.findById(2)).thenReturn(java.util.Optional.of(destinationAccount));

        assertThatThrownBy(() -> userService.transfer(connectedUser, 1, 2, new BigDecimal("2000.00")))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Insufficient funds in the source account.");

        verify(accountRepository, never()).save(sourceAccount);
        verify(accountRepository, never()).save(destinationAccount);
        verify(transactionRepository, never()).save(any(Transaction.class));
    }

    // Add more tests for other edge cases and error conditions
}

