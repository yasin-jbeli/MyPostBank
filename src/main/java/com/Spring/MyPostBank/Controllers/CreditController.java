package com.Spring.MyPostBank.Controllers;

import com.Spring.MyPostBank.DTOs.CreditDTO;
import com.Spring.MyPostBank.DTOs.RepaymentDetailDTO;
import com.Spring.MyPostBank.Services.CreditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user/loans")
@AllArgsConstructor
public class CreditController {

    private final CreditService creditService;

    @PostMapping(value = "/request-loan", consumes = { "multipart/form-data"})
    @Operation(summary = "Request a new loan")
    public ResponseEntity<?> requestLoan(
            @RequestParam BigDecimal amount,
            @RequestParam BigDecimal rate,
            @RequestParam Integer duration,
            @RequestParam Integer accountId,
            @Parameter(description = "Connected user") Principal connectedUser,
            @RequestPart("form") MultipartFile applicationForm,
            @RequestPart("statements") MultipartFile bankStatements,
            @RequestPart("proof") MultipartFile proofOfIncome
    ) throws IOException {
        creditService.requestLoan(amount, rate, duration, accountId, connectedUser, applicationForm, bankStatements, proofOfIncome);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/")
    @Operation(summary = "Get all loans by user")
    public ResponseEntity<List<CreditDTO>> getLoans(@Parameter(description = "Connected user") Principal connectedUser) {
        List<CreditDTO> creditDTOs = creditService.getLoansByUser(connectedUser);
        return ResponseEntity.ok(creditDTOs);
    }

    @GetMapping("/{creditId}")
    @Operation(summary = "Get loan by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved loan"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Loan not found")
    })
    public ResponseEntity<CreditDTO> getLoanById(
            @PathVariable Integer creditId,
            @Parameter(description = "Connected user") Principal connectedUser
    ) {
        CreditDTO creditDTO = creditService.getLoanById(creditId, connectedUser);
        if (creditDTO != null) {
            return ResponseEntity.ok(creditDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ongoing-loans")
    @Operation(summary = "ongoing payments")
    public ResponseEntity<CreditDTO> ongoingLoans(@Parameter(description = "connected user") Principal connectedUser) {
        CreditDTO credit = creditService.getOngoingLoans(connectedUser);
        if (credit != null) {
            return ResponseEntity.ok(credit);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{creditId}/due-payments")
    @Operation(summary = "Get due payments")
    public ResponseEntity<List<RepaymentDetailDTO>> getDuePayments(@Parameter(description = "Connected user") Principal connectedUser, @PathVariable Integer creditId) {
        List<RepaymentDetailDTO> repaymentDetailDTO = creditService.getDuePayments(connectedUser, creditId);
        return ResponseEntity.ok(repaymentDetailDTO);
    }

    @GetMapping("/{crediId}/paid-payments")
    @Operation(summary = "Get paid payments")
    public ResponseEntity<List<RepaymentDetailDTO>> getPaidPayments(@Parameter(description = "Connected user") Principal connectedUser, @PathVariable Integer crediId) {
        List<RepaymentDetailDTO> repaymentDetailDTO = creditService.getPaidPayments(connectedUser, crediId);
        return ResponseEntity.ok(repaymentDetailDTO);
    }

    @GetMapping("/{creditId}/all-payments")
    @Operation(summary = "Get all payments")
    public ResponseEntity<List<RepaymentDetailDTO>> getAllRepaymentsByUser(@Parameter(description = "Connected user") Principal connectedUser, @PathVariable Integer creditId) {
        List<RepaymentDetailDTO> repaymentDetailDTO = creditService.getAllRepaymentsByUser(connectedUser, creditId);
        return ResponseEntity.ok(repaymentDetailDTO);
    }

}
