package com.Spring.MyPostBank.Models;


import com.Spring.MyPostBank.Enums.CreditStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;
import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Credit extends AbstractEntity {

    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer duration;

    @Enumerated(EnumType.STRING)
    private CreditStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "account_id")
    private BankAccount account;
    @OneToMany(mappedBy = "credit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RepaymentDetail> repaymentDetails;
}
