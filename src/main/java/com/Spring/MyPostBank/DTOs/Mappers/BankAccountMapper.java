package com.Spring.MyPostBank.DTOs.Mappers;

import com.Spring.MyPostBank.DTOs.BankAccountDTO;
import com.Spring.MyPostBank.Models.BankAccount;
import org.springframework.stereotype.Component;

@Component
public class BankAccountMapper {

    public BankAccountDTO mapToDTO(BankAccount bankAccount) {
        return BankAccountDTO.builder()
                .id(bankAccount.getId())
                .accountNo(bankAccount.getAccountNo())
                .accountType(bankAccount.getAccountType())
                .balance(bankAccount.getBalance())
                .userId(bankAccount.getUser() != null ? bankAccount.getUser().getId() : null)
                .status(bankAccount.getStatus())
                .owner(bankAccount.getUser().getFirstName()+" "+bankAccount.getUser().getLastName())
                .createdDate(bankAccount.getCreatedDate())
                .build();
    }


}
