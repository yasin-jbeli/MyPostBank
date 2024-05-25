package com.Spring.MyPostBank.DTOs.Mappers;

import com.Spring.MyPostBank.DTOs.TransactionDTO;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public TransactionDTO mapToDTO(Transaction transaction) {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setId(transaction.getId());
        transactionDTO.setTransactionType(transaction.getTransactionType());
        transactionDTO.setAmount(transaction.getAmount());
        transactionDTO.setDescription(transaction.getDescription());
        transactionDTO.setDate(transaction.getDate());
        transactionDTO.setBeneficiary(transaction.getBeneficiary());
        transactionDTO.setCardId(transaction.getCardId());
        transactionDTO.setAccountId(transaction.getAccountId());
        return transactionDTO;
    }
}

