package com.Spring.MyPostBank.Models;

import com.Spring.MyPostBank.Enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Transaction extends AbstractEntity {

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    private BigDecimal amount;
    private String description;
    private LocalDateTime date;
    private Integer beneficiary;
    private Integer CardId;
    private Integer accountId;

}
