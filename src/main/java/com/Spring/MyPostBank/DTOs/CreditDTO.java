package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.CreditStatus;
import com.Spring.MyPostBank.Models.BankAccount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreditDTO {
    private Integer id;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer duration;
    private CreditStatus status;
    private Integer account;
    private String Owner;
    private LocalDateTime createdOn;
    private MultipartFile applicationForm;
    private MultipartFile bankStatements;
    private MultipartFile proofOfIncome;
}
