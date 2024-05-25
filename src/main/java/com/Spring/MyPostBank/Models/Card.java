package com.Spring.MyPostBank.Models;

import com.Spring.MyPostBank.Enums.CardStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;


@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Card extends AbstractEntity {

    @Column(nullable = false, unique = true)
    private String cardNo;

    @Enumerated(EnumType.STRING)
    private CardStatus status;

    private LocalDate expirationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id")
    private BankAccount account;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
}
