package com.Spring.MyPostBank.Config;

import com.Spring.MyPostBank.Enums.TransactionType;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Transaction;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CardRepository;
import com.Spring.MyPostBank.Repositories.TransactionRepository;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Getter
@Setter
public class FileChangeListener extends Thread {

    // TRANSACTION ORDER:
    // TYPE,amount,description,date,beneficiary,cardId,accountId

    private static final Logger LOGGER = LoggerFactory.getLogger(FileChangeListener.class);

    private final TransactionRepository transactionRepository;
    private final CardRepository cardRepository;
    private final BankAccountRepository accountRepository;

    private int lastProcessedLine = 0;
    private final Path directory = Paths.get("src/main/resources/data");
    private final Path fileToMonitor = directory.resolve("transactions.csv");

    @PostConstruct
    public void init() {
        start();
    }

    @Override
    public void run() {
        try (WatchService watchService = FileSystems.getDefault().newWatchService()) {
            directory.register(watchService, StandardWatchEventKinds.ENTRY_MODIFY);

            while (!Thread.currentThread().isInterrupted()) {
                WatchKey key = watchService.take();
                for (WatchEvent<?> event : key.pollEvents()) {
                    WatchEvent.Kind<?> kind = event.kind();
                    if (kind == StandardWatchEventKinds.OVERFLOW) {
                        continue;
                    }

                    WatchEvent<Path> ev = (WatchEvent<Path>) event;
                    Path filename = ev.context();

                    if (filename.equals(fileToMonitor.getFileName())) {
                        LOGGER.info("File modified: {}", filename);
                        processTransactionsFromFile();
                    }
                }
                key.reset();
            }
        } catch (IOException | InterruptedException e) {
            LOGGER.error("Error in file monitoring thread: {}", e.getMessage(), e);
        }
    }

    private void processTransactionsFromFile() {
        try (BufferedReader br = Files.newBufferedReader(fileToMonitor)) {
            String line;
            List<Transaction> transactions = new ArrayList<>();

            for (int i = 0; i < lastProcessedLine; i++) {
                br.readLine();
            }

            while ((line = br.readLine()) != null) {
                lastProcessedLine++;
                String[] fields = line.split(",");
                Transaction transaction = createTransaction(fields);
                if (transaction != null) {
                    transactions.add(transaction);
                }
            }

            saveTransactions(transactions);

            LOGGER.info("Last processed line: {}", lastProcessedLine);
        } catch (IOException | DateTimeParseException | NumberFormatException e) {
            LOGGER.error("Error processing transactions from file: {}", e.getMessage(), e);
        }
    }

    private Transaction createTransaction(String[] fields) {
        try {
            Transaction transaction = new Transaction();
            transaction.setTransactionType(TransactionType.valueOf(fields[0].trim()));
            transaction.setAmount(new BigDecimal(fields[1].trim()));
            transaction.setDescription(fields[2].trim());
            transaction.setDate(LocalDateTime.parse(fields[3].trim()));

            Integer beneficiary = null;
            Integer accountId = null;
            Integer cardId = null;

            switch (transaction.getTransactionType()) {
                case DEPOSIT:
                    beneficiary = Integer.valueOf(fields[4].trim());
                    break;
                case WITHDRAWAL:
                    accountId = Integer.valueOf(fields[4].trim());
                    break;
                case CARD_PAYMENT:
                    accountId = Integer.valueOf(fields[4].trim());
                    cardId = Integer.valueOf(fields[5].trim());
                    break;
                case TRANSFER:
                    accountId = Integer.valueOf(fields[4].trim());
                    beneficiary = Integer.valueOf(fields[5].trim());
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported transaction type: " + transaction.getTransactionType());
            }

            transaction.setBeneficiary(beneficiary);
            transaction.setAccountId(accountId);
            transaction.setCardId(cardId);

            validateTransaction(transaction);
            updateAccountBalance(transaction);
            return transaction;

        } catch (DateTimeParseException | IllegalArgumentException e) {
            LOGGER.error("Error creating transaction: {}", e.getMessage(), e);
        }
        return null;
    }

    private void validateTransaction(Transaction transaction) {
        switch (transaction.getTransactionType()) {
            case DEPOSIT:
                if (transaction.getBeneficiary() == null) {
                    throw new IllegalArgumentException("Account number is required for DEPOSIT transaction");
                }
                break;
            case WITHDRAWAL:
                if (transaction.getAccountId() == null) {
                    throw new IllegalArgumentException("Account number is required for WITHDRAWAL transaction");
                }
                break;
            case CARD_PAYMENT:
                if (transaction.getCardId() == null || transaction.getAccountId() == null) {
                    throw new IllegalArgumentException("Both card number and account number are required for CARD_PAYMENT transaction");
                }
                break;
            case TRANSFER:
                if (transaction.getAccountId() == null || transaction.getBeneficiary() == null) {
                    throw new IllegalArgumentException("Both account number and beneficiary are required for TRANSFER transaction");
                }
                break;
        }
    }

    private void updateAccountBalance(Transaction transaction) {
        TransactionType transactionType = transaction.getTransactionType();
        LOGGER.info("Updating balance for transaction type: {}", transactionType);
        BigDecimal amount = transaction.getAmount();
        LOGGER.info("Transaction amount: {}", amount);
        Integer accountId = transaction.getAccountId();
        LOGGER.info("Account ID: {}", accountId);
        Integer beneficiaryAccountId = transaction.getBeneficiary();
        LOGGER.info("Beneficiary Account ID: {}", beneficiaryAccountId);

        switch (transactionType) {
            case WITHDRAWAL:
            case CARD_PAYMENT:
                updateBalance(accountId, amount.negate());
                break;

            case DEPOSIT:
                updateBalance(beneficiaryAccountId, amount);
                break;

            case TRANSFER:
                updateBalance(accountId, amount.negate());
                updateBalance(beneficiaryAccountId, amount);
                break;

            default:
                throw new IllegalArgumentException("Unsupported transaction type");
        }
    }

    private void updateBalance(Integer accountId, BigDecimal amount) {
        LOGGER.info("Searching for account with account number: {}", accountId);
        Optional<BankAccount> bankAccountOptional = accountRepository.findById(accountId);

        if (bankAccountOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid account number");
        }

        BankAccount bankAccount = bankAccountOptional.get();
        BigDecimal currentBalance = bankAccount.getBalance();
        LOGGER.info("Current balance for account {}: {}", bankAccount.getAccountNo(), currentBalance);

        BigDecimal newBalance = currentBalance.add(amount);
        LOGGER.info("New balance after update for account {}: {}", bankAccount.getAccountNo(), newBalance);

        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Insufficient funds");
        }

        bankAccount.setBalance(newBalance);
        accountRepository.save(bankAccount);
        LOGGER.info("Account balance updated successfully for account {}", bankAccount.getAccountNo());
    }

    private void saveTransactions(List<Transaction> transactions) {
        LOGGER.info("Saving transactions: {}", transactions.size());
        System.out.print(transactions);
        transactionRepository.saveAll(transactions);
    }
}
