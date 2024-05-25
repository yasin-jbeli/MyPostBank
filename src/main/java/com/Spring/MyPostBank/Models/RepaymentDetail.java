package com.Spring.MyPostBank.Models;

import com.Spring.MyPostBank.Enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "repayment_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RepaymentDetail extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "credit_id", nullable = false)
    private Credit credit;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "month", nullable = false)
    private Integer month;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "principal_payment", nullable = false)
    private BigDecimal principalPayment;

    @Column(name = "interest_payment", nullable = false)
    private BigDecimal interestPayment;

    @Column(name = "remaining_balance", nullable = false)
    private BigDecimal remainingBalance;

    @Column(name = "payment_amount")
    private BigDecimal paymentAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;
}

