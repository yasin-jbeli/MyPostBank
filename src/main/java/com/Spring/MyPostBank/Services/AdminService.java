package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.*;
import com.Spring.MyPostBank.Enums.CheckBookStatus;
import com.Spring.MyPostBank.Models.Card;
import com.Spring.MyPostBank.Models.Credit;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {

        List<BankAccountDTO> getAllAccounts();

        BankAccountDTO getAccountById(Integer accountId);

        void closeAccount(Integer accountId);

        List<UserDTO> getAllUsers();

        UserDTO getUserById(Integer userId);

        void activateAccount(Integer accountId);
        void rejectAccount(Integer accountId);

        List<BankAccountDTO> getPendingAccounts();

        void freezeAccount(Integer accountId);

        List<BankAccountDTO> getSavingsAccounts();

        List<BankAccountDTO> getCheckingAccounts();

        List<CheckbookDTO> getAllCheckbookRequests();

        List<CreditDTO> getAllCreditRequests();

        List<CreditDTO> getAllLoans();

        List<RepaymentDetailDTO> getInstallments(Integer creditId);

        void approveCredit(Integer creditId);

        void rejectCredit(Integer creditId);

        void activateCard(Integer cardId);

        void deactivateCard(Integer cardId);

        void updateCheckbook(Integer checkId, CheckBookStatus status);
}
