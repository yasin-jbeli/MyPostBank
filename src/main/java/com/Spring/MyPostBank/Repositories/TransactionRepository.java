package com.Spring.MyPostBank.Repositories;

import com.Spring.MyPostBank.DTOs.TransactionDTO;
import com.Spring.MyPostBank.Enums.TransactionType;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Transaction;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    Page<Transaction> findByBeneficiaryInOrAccountIdIn(Pageable pageable, List<Integer> accountId, List<Integer> accountId1);

    List<Transaction> findByBeneficiaryInOrAccountIdIn(List<Integer> accountId, List<Integer> accountId1);
}
