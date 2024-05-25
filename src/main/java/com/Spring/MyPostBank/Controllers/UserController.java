package com.Spring.MyPostBank.Controllers;

import com.Spring.MyPostBank.Authentication.ChangePasswordRequest;
import com.Spring.MyPostBank.DTOs.TransactionDTO;
import com.Spring.MyPostBank.DTOs.UserDetailsDTO;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Services.UserService;
import com.Spring.MyPostBank.Services.TransactionService;
import com.Spring.MyPostBank.Utils.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final TransactionService transactionService;

    @Operation(summary = "Change user password")
    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update user details")
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(Principal connectedUser, @RequestBody User updatedUser) {
        User user = userService.updateUser(connectedUser, updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Operation(summary = "Delete user account")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        boolean deleted = userService.deleteUser(Integer.valueOf(userId));
        if (deleted) {
            return ResponseEntity.ok("User with ID " + userId + " deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found.");
        }
    }

    @Operation(summary = "Get user details")
    @GetMapping("/details")
    public ResponseEntity<UserDetailsDTO> getUserDetails(Principal connectedUser) {
        return userService.getUserDetails(connectedUser);
    }


    @Operation(summary = "Get transactions by user")
    @GetMapping("/transactions")
    public ResponseEntity<PageResponse<TransactionDTO>> getTransactionsByUser(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Principal connectedUser) {
        return ResponseEntity.ok(transactionService.getTransactionsByUser(page, size, connectedUser));
    }

    @Operation(summary = "Get transaction by ID")
    @GetMapping("/transactions/{transactionId}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Integer transactionId, Principal connectedUser) {
        try {
            Optional<TransactionDTO> transactionDTO = transactionService.getTransactionById(transactionId, connectedUser);
            return transactionDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @Operation(summary = "Get transaction by user")
    @GetMapping("/trans")
    public ResponseEntity<List<Optional<TransactionDTO>>> getTrans(Principal connectedUser) {
        List<Optional<TransactionDTO>> transactionDTOs = transactionService.getTrans(connectedUser);
        if (transactionDTOs != null) {
            return ResponseEntity.ok(transactionDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Transfer funds between accounts")
    @PostMapping("/transfer")
    public ResponseEntity<?> transferFunds(
            @Valid @Parameter(in = ParameterIn.QUERY, description = "Source account id") @RequestParam Integer sourceAccountId,
            @Valid @Parameter(in = ParameterIn.QUERY, description = "Destination account id") @RequestParam Integer destinationAccountId,
            @Valid @Parameter(in = ParameterIn.QUERY, description = "Amount to transfer") @RequestParam BigDecimal amount,
            Principal connectedUser
    ) {
        try {
            userService.transfer(connectedUser, sourceAccountId, destinationAccountId, amount);
            return ResponseEntity.ok("Funds transferred successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error transferring funds: " + e.getMessage());
        }
    }
}
