package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.TransactionDTO;
import com.Spring.MyPostBank.Utils.PageResponse;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public interface TransactionService {


    PageResponse<TransactionDTO> getTransactionsByUser(int page, int size, Principal connectedUser);

    TransactionDTO getTransaction(Integer transactionId);

    Optional<TransactionDTO> getTransactionById(Integer transactionId, Principal connectedUser);

    Object getAllTransactions(int page, int size);

    List<Optional<TransactionDTO>> getTrans(Principal connectedUser);

    List<Optional<TransactionDTO>> getAllTrans();
}
