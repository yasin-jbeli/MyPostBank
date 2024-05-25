package com.Spring.MyPostBank.DTOs.Mappers;

import com.Spring.MyPostBank.DTOs.UserDTO;
import com.Spring.MyPostBank.Models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .dateJoined(user.getCreatedDate())
                .build();
    }

    public User mapToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole());
        return user;
    }

}
