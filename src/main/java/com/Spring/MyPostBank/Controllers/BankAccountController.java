package com.Spring.MyPostBank.Controllers;

import com.Spring.MyPostBank.DTOs.BankAccountDTO;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Services.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user/accounts")
@AllArgsConstructor
public class BankAccountController {

    private final AccountService accountService;


    @Operation(summary = "Open a new bank account")
    @PostMapping(value = "/open", consumes = "multipart/form-data")
    public ResponseEntity<?> openAccount(
            @Valid @Parameter(in = ParameterIn.QUERY, description = "Type of account") @RequestParam AccountType accountType,
            @RequestPart("file") MultipartFile file,
            @Parameter()
            Principal connectedUser
    ) {
        accountService.openAccount(connectedUser,accountType,file);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get user accounts")
    @GetMapping("/")
    public List<BankAccountDTO> getUserAccounts(Principal connectedUser) {
        return accountService.getUserAccounts(connectedUser);
    }

    @Operation(summary = "Get specific account by ID")
    @GetMapping("/{accountId}")
    public Optional<BankAccountDTO> getSpecificAccount(@PathVariable Integer accountId, Principal connectedUser) {
        return accountService.getAccountById(accountId, connectedUser);
    }

    @Operation(summary = "Get account balance")
    @GetMapping("/{accountId}/balance")
    public Optional<Object> getBalance(@PathVariable Integer accountId, Principal connectedUser) {
        return accountService.getBalance(accountId, connectedUser);
    }

    @Operation(summary = "Activate account by ID")
    @PutMapping("/{accountId}/activate")
    public ResponseEntity<String> activateAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
    , Principal connectedUser) {
        accountService.activateAccount(accountId, connectedUser);
        return ResponseEntity.ok("Account with ID " + accountId + " activated successfully.");
    }

    @Operation(summary = "deactivate account by ID")
    @PutMapping("/{accountId}/deactivate")
    public ResponseEntity<String> deactivateAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
    , Principal connectedUser) {
        accountService.deactivateAccount(accountId, connectedUser);
        return ResponseEntity.ok("Account with ID " + accountId + " deactivated successfully.");
    }

    @Operation(summary = "delete account by ID")
    @DeleteMapping("/{accountId}/delete")
    public ResponseEntity<String> deleteAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
            , Principal connectedUser) {
        accountService.deleteAccount(accountId, connectedUser);
        return ResponseEntity.ok("Account with ID " + accountId + " deleted.");
    }

    @Operation(summary = "Get all accounts")
    @GetMapping("/accounts")
    public List<BankAccountDTO> getAllAccountsNotAdmin() {return accountService.getAllAccountsNotAdmin();
    }

}
