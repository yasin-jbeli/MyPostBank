package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.Role;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Card;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetailsDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private List<String> accounts;
    private List<String> cards;
    private Role role;
    private LocalDateTime dateJoined;
}
