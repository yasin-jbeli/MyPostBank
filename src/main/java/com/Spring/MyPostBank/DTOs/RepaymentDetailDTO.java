package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RepaymentDetailDTO {
    private Integer month;
    private LocalDate dueDate;
    private BigDecimal principalPayment;
    private BigDecimal interestPayment;
    private BigDecimal remainingBalance;
    private BigDecimal paymentAmount;
    private PaymentStatus paymentStatus;
}

