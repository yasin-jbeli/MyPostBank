package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.Authentication.ChangePasswordRequest;
import com.Spring.MyPostBank.DTOs.UserDetailsDTO;
import com.Spring.MyPostBank.Models.Notification;
import com.Spring.MyPostBank.Models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@Service
public interface UserService {

    void changePassword(ChangePasswordRequest request, Principal connectedUser);

    User updateUser(Principal userId, User user);

    boolean deleteUser(Integer userId);

    void transfer(Principal connectedUser, Integer sourceAccountId, Integer destinationAccountId, BigDecimal amount);

    ResponseEntity<UserDetailsDTO> getUserDetails(Principal connectedUser);

    List<Notification> getNot(Principal connectedUser);
}
