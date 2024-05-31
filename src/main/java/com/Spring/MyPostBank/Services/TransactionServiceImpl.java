package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.Mappers.TransactionMapper;
import com.Spring.MyPostBank.DTOs.TransactionDTO;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import com.Spring.MyPostBank.Utils.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final BankAccountRepository accountRepository;
    private final TextEncryptor textEncryptor;


    @Override
    public PageResponse<TransactionDTO> getTransactionsByUser(int page, int size, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        List<BankAccount> userAccounts = accountRepository.findByUserId(user.getId());

        List<Integer> accountId = userAccounts.stream()
                .map(BankAccount::getId)
                .toList();

        Page<Transaction> transactions = transactionRepository.findByBeneficiaryInOrAccountIdIn(pageable,accountId, accountId);
        List<TransactionDTO> transactionsDTO = transactions.stream()
                .map(transactionMapper::mapToDTO)
                .toList();
        return new PageResponse<>(
                transactionsDTO,
                transactions.getNumber(),
                transactions.getSize(),
                transactions.getTotalElements(),
                transactions.getTotalPages(),
                transactions.isFirst(),
                transactions.isLast()
        );
    }


    @Override
    public PageResponse<TransactionDTO> getAllTransactions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        List<TransactionDTO> transactionsDTO = transactions.getContent().stream()
                .map(transactionMapper::mapToDTO)
                .toList();
        return new PageResponse<>(
                transactionsDTO,
                transactions.getNumber(),
                transactions.getSize(),
                transactions.getTotalElements(),
                transactions.getTotalPages(),
                transactions.isFirst(),
                transactions.isLast()
        );
    }

    @Override
    public List<Optional<TransactionDTO>> getTrans(Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<BankAccount> userAccounts = accountRepository.findByUserId(user.getId());
        List<Integer> accountIds = userAccounts.stream()
                .map(BankAccount::getId)
                .collect(Collectors.toList());
        List<Transaction> transactions = transactionRepository.findByBeneficiaryInOrAccountIdIn(accountIds, accountIds);
        return transactions.stream()
                .map(transaction -> Optional.ofNullable(transactionMapper.mapToDTO(transaction)))
                .collect(Collectors.toList());
    }

    @Override
    public List<Optional<TransactionDTO>> getAllTrans() {
        List<Transaction> transactions = transactionRepository.findAll();
        LocalDate today = LocalDate.now();

        return transactions.stream()
                .filter(transaction -> transaction.getDate().toLocalDate().equals(today))
                .map(transaction -> Optional.ofNullable(transactionMapper.mapToDTO(transaction)))
                .collect(Collectors.toList());
    }



    @Override
    public TransactionDTO getTransaction(Integer transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
        if (transaction != null) {
            return transactionMapper.mapToDTO(transaction);
        } else {
            return null;
        }
    }

    @Override
    public Optional<TransactionDTO> getTransactionById(Integer transactionId, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<BankAccount> userAccounts = accountRepository.findByUserId(user.getId());
        List<Integer> accountId = userAccounts.stream()
                .map(BankAccount::getId)
                .toList();

        Optional<Transaction> transactionOptional = transactionRepository.findById(transactionId);

        if (transactionOptional.isPresent()) {
            Transaction transaction = transactionOptional.get();
            if (accountId.contains(transaction.getBeneficiary()) ||
                    accountId.contains(transaction.getAccountId())){
                TransactionDTO transactionDTO = transactionMapper.mapToDTO(transaction);

                return Optional.of(transactionDTO);
            } else {
                throw new IllegalArgumentException("User is not authorized to access this transaction");
            }
        } else {
            throw new IllegalArgumentException("Transaction not found");
        }
    }


}
