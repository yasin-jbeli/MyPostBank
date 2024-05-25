package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.CardStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardDTO {
    private Integer cardId;
    private String cardNo;
    private CardStatus status;
    private LocalDate expirationDate;
    private Integer accountId;
    private Integer userId;
    private LocalDateTime createDate;
    private String Owner;
}
