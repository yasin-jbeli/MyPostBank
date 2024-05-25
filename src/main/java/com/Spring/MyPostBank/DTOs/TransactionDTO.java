package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.TransactionType;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private Integer id;
    private TransactionType transactionType;
    private BigDecimal amount;
    private String description;
    private LocalDateTime date;
    //receiver
    private Integer beneficiary;
    private Integer cardId;
    //sender
    private Integer accountId;
}
