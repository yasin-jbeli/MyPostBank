package com.Spring.MyPostBank.Repositories;

import com.Spring.MyPostBank.Enums.CreditStatus;
import com.Spring.MyPostBank.Models.Credit;
import com.Spring.MyPostBank.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Integer> {
    List<Credit> findByUser(User user);

    Credit findByUserAndId(User user, Integer creditId);

    List<Credit> findAllByStatus(CreditStatus creditStatus);

    Credit findByUserAndStatus(User user, CreditStatus creditStatus);
}
