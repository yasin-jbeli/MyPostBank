package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.BankAccountDTO;
import com.Spring.MyPostBank.Enums.AccountType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public interface AccountService {

    void openAccount(Principal connectedUser, AccountType accountType, MultipartFile file);

    List<BankAccountDTO> getUserAccounts(Principal connectedUser);

    Optional<BankAccountDTO> getAccountById(Integer accountId, Principal connectedUser);

    Optional<Object> getBalance(Integer accountId, Principal connectedUser);

    void activateAccount(Integer accountId, Principal connectedUser);

    void deactivateAccount(Integer accountId, Principal connectedUser);

    void deleteAccount(Integer accountId, Principal connectedUser);

    List<BankAccountDTO> getAllAccountsNotAdmin();
}
