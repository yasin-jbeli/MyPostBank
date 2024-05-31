package com.Spring.MyPostBank.Controllers;

import com.Spring.MyPostBank.DTOs.*;
import com.Spring.MyPostBank.Enums.CheckBookStatus;
import com.Spring.MyPostBank.Services.AdminService;
import com.Spring.MyPostBank.Services.CardService;
import com.Spring.MyPostBank.Services.TransactionService;
import com.Spring.MyPostBank.Services.UserService;
import com.Spring.MyPostBank.Utils.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;
    private final CardService cardService;
    private final TransactionService transactionService;

    @Operation(summary = "Get all users")
    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return adminService.getAllUsers();
    }

    @Operation(summary = "Get user by ID")
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDTO> getUserById(
            @Valid @Parameter(in = ParameterIn.PATH, description = "User ID") @PathVariable Integer userId
    ) {
        UserDTO user = adminService.getUserById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Delete user by ID")
    @DeleteMapping("/users/{userId}/delete")
    public ResponseEntity<String> deleteUser(
            @Valid @Parameter(in = ParameterIn.PATH, description = "User ID") @PathVariable Integer userId
    ) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("Account with ID " + userId + " deleted successfully.");
    }

    @Operation(summary = "Get all accounts")
    @GetMapping("/accounts")
    public List<BankAccountDTO> getAllAccounts() {
        return adminService.getAllAccounts();
    }

    @Operation(summary = "Get account by ID")
    @GetMapping("/accounts/{accountId}")
    public ResponseEntity<BankAccountDTO> getAccountById(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
    ) {
        BankAccountDTO account = adminService.getAccountById(accountId);
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Close account by ID")
    @DeleteMapping("/accounts/{accountId}/close")
    public ResponseEntity<String> closeAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
    ) {
        adminService.closeAccount(accountId);
        return ResponseEntity.ok("Account with ID " + accountId + " closed successfully.");
    }

    @Operation(summary = "Activate account by ID")
    @PostMapping("/accounts/{accountId}/activate")
    public ResponseEntity<String> activateAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
    ) {
        adminService.activateAccount(accountId);
        return ResponseEntity.ok("Account with ID " + accountId + " activated successfully.");
    }

    @Operation(summary = "Reject account by ID")
    @PutMapping("/accounts/{accountId}/deactivate")
    public ResponseEntity<String> rejectAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
    ) {
        adminService.rejectAccount(accountId);
        return ResponseEntity.ok("Account with ID " + accountId + " rejected.");
    }

    @Operation(summary = "Freeze account by ID")
    @PutMapping("/accounts/{accountId}/freeze")
    public ResponseEntity<String> freezeAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId
    ) {
        adminService.freezeAccount(accountId);
        return ResponseEntity.ok("Account with ID " + accountId + " frozen.");
    }

    @Operation(summary = "Get all pending accounts")
    @GetMapping("/accounts/pending")
    public ResponseEntity<List<BankAccountDTO>> getPendingAccounts() {
        List<BankAccountDTO> accountDTO = adminService.getPendingAccounts();
        return ResponseEntity.ok(accountDTO);
    }

    @Operation(summary = "Get all savings accounts")
    @GetMapping("/accounts/savings")
    public ResponseEntity<List<BankAccountDTO>> getSavingsAccounts() {
        List<BankAccountDTO> accountDTO = adminService.getSavingsAccounts();
        return ResponseEntity.ok(accountDTO);
    }

    @Operation(summary = "Get all checking accounts")
    @GetMapping("/accounts/checking")
    public ResponseEntity<List<BankAccountDTO>> getCheckingAccounts() {
        List<BankAccountDTO> accountDTO = adminService.getCheckingAccounts();
        return ResponseEntity.ok(accountDTO);
    }

    @Operation(summary = "Get all pending cards")
    @GetMapping("/cards/pending")
    public ResponseEntity<List<CardDTO>> getPendingCards() {
        List<CardDTO> card = cardService.getPendingCards();
        return ResponseEntity.ok(card);
    }

    @Operation(summary = "Approve card by ID")
    @PutMapping("/cards/{cardId}/approve")
    public ResponseEntity<String> approveCard(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId
    ) {
        cardService.approveCard(cardId);
        return ResponseEntity.ok("Card with ID " + cardId + " approved.");
    }

    @Operation(summary = "Reject card by ID")
    @PutMapping("/cards/{cardId}/reject")
    public ResponseEntity<String> rejectCard(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId
    ) {
        cardService.rejectCard(cardId);
        return ResponseEntity.ok("Card with ID " + cardId + " rejected.");
    }

    @Operation(summary = "Delete card by ID")
    @DeleteMapping("/cards/{cardId}/delete")
    public ResponseEntity<String> deleteCard(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId
    ) {
        cardService.deleteCard(cardId);
        return ResponseEntity.ok("Card with ID " + cardId + " deleted.");
    }

    @Operation(summary = "Activate card by ID")
    @PutMapping("/cards/{cardId}/activate")
    public ResponseEntity<String> activateCard(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId
    ) {
        adminService.activateCard(cardId);
        return ResponseEntity.ok("Card with ID " + cardId + " activated.");
    }

    @Operation(summary = "Deactivate card by ID")
    @PutMapping("/cards/{cardId}/deactivate")
    public ResponseEntity<String> deactivateCard(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId
    ) {
        adminService.deactivateCard(cardId);
        return ResponseEntity.ok("Card with ID " + cardId + " deactivated.");
    }

    @Operation(summary = "Get all cards")
    @GetMapping("/cards")
    public List<CardDTO> getAllCards() {
        return cardService.getAllCards();
    }

    @Operation(summary = "Get all transactions")
    @GetMapping("/transactions")
    public ResponseEntity<PageResponse<TransactionDTO>> getAllTransactions(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok((PageResponse<TransactionDTO>) transactionService.getAllTransactions(page, size));
    }

    @Operation(summary = "Get all transactions")
    @GetMapping("/transactions/noPage")
    public List<Optional<TransactionDTO>> getAllTrans(){
        return transactionService.getAllTrans();
    }

    @Operation(summary = "Get transaction by ID")
    @GetMapping("/transactions/{transactionId}")
    public TransactionDTO getTransaction(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Transaction ID") @PathVariable Integer transactionId
    ) {
        return transactionService.getTransaction(transactionId);
    }

    @GetMapping("checkbook-requests")
    @Operation(summary = "Get all checkbook requests")
    public ResponseEntity<List<CheckbookDTO>> checkbookRequests() {
        List<CheckbookDTO> checkbookRequests = adminService.getAllCheckbookRequests();
        return ResponseEntity.ok(checkbookRequests);
    }

    @PostMapping("/checkbook/{checkId}/update/{checkbookStatus}")
    @Operation(summary = "update checkbook status")
    public ResponseEntity<String> updateCheckbookStatus(@Parameter(in=ParameterIn.PATH, description = "checkbook id") @PathVariable Integer checkId,
                                                        @Parameter(in=ParameterIn.PATH, description = "status") @PathVariable CheckBookStatus checkbookStatus) {
        adminService.updateCheckbook(checkId, checkbookStatus);
        return ResponseEntity.ok("Checkbook with ID " + checkId + " updated.");
    }

    @GetMapping("/credit-requests")
    @Operation(summary = "Get all credit requests")
    public ResponseEntity<List<CreditDTO>> creditRequests() {
        List<CreditDTO> creditRequests = adminService.getAllCreditRequests();
        return ResponseEntity.ok(creditRequests);
    }

    @GetMapping("/loans")
    @Operation(summary = "Get all loans")
    public ResponseEntity<List<CreditDTO>> getAllLoans() {
        List<CreditDTO> creditRequests = adminService.getAllLoans();
        return ResponseEntity.ok(creditRequests);
    }

    @GetMapping("/loans/{creditId}/installments")
    @Operation(summary = "Get credit installments")
    public ResponseEntity<List<RepaymentDetailDTO>> getInstallments(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Credit request ID") @PathVariable Integer creditId
    ) {
        List<RepaymentDetailDTO> installments = adminService.getInstallments(creditId);
        return ResponseEntity.ok(installments);
    }

    @PostMapping("/credit-requests/{creditId}/approve")
    @Operation(summary = "Approve credit request by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Credit request approved"),
            @ApiResponse(responseCode = "404", description = "Credit request not found")
    })
    public ResponseEntity<String> approveCredit(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Credit request ID") @PathVariable Integer creditId
    ) {
        adminService.approveCredit(creditId);
        return ResponseEntity.ok("Credit request with ID " + creditId + " approved.");
    }

    @PutMapping("/credit-requests/{creditId}/reject")
    @Operation(summary = "Reject credit request by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Credit request rejected"),
            @ApiResponse(responseCode = "404", description = "Credit request not found")
    })
    public ResponseEntity<String> rejectCredit(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Credit request ID") @PathVariable Integer creditId
    ) {
        adminService.rejectCredit(creditId);
        return ResponseEntity.ok("Credit request with ID " + creditId + " rejected.");
    }




}
