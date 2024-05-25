package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.Role;
import com.Spring.MyPostBank.Models.User;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
    private LocalDateTime dateJoined;
}

