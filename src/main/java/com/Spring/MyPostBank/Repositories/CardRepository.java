package com.Spring.MyPostBank.Repositories;

import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.CardStatus;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Card;
import com.Spring.MyPostBank.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
     List<Card> findByUserId(Integer id);

    Optional<Card> findByIdAndUserId(Integer id, Integer user_id);

    List<Card> findByStatus(CardStatus cardStatus);

    List<Card> findByAccount(BankAccount account);

    List<Card> findByUserIdAndAccountId(Integer user_id, Integer accountId);

    Card findByAccountId(Integer accountId);
}
