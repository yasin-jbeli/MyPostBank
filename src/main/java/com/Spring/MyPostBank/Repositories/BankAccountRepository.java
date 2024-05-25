package com.Spring.MyPostBank.Repositories;

import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Models.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Integer> {

    List<BankAccount> findByStatusIn(List<AccountStatus> statuses);
    List<BankAccount> findByUserId(Integer userId);
    Optional<BankAccount> findByIdAndUserId(Integer accountId, Integer userId);
    List<BankAccount> findByAccountTypeIn(List<AccountType> AccountTypes);
    BankAccount findByAccountNo(String destinationAccountNo);

}
