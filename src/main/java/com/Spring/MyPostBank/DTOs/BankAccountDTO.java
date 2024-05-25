package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Models.Card;
import com.Spring.MyPostBank.Models.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BankAccountDTO {
    private Integer id;
    private String accountNo;
    private AccountType accountType;
    private BigDecimal balance;
    private Integer userId;
    private AccountStatus status;
    // for displaying on the frontend
    private String owner;
    private LocalDateTime createdDate;
}

