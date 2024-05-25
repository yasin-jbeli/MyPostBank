package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.Authentication.ChangePasswordRequest;
import com.Spring.MyPostBank.DTOs.BankAccountDTO;
import com.Spring.MyPostBank.DTOs.UserDetailsDTO;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    void changePassword(ChangePasswordRequest request, Principal connectedUser);

    User updateUser(Principal userId, User user);

    boolean deleteUser(Integer userId);

    void transfer(Principal connectedUser, Integer sourceAccountId, Integer destinationAccountId, BigDecimal amount);

    ResponseEntity<UserDetailsDTO> getUserDetails(Principal connectedUser);
}
