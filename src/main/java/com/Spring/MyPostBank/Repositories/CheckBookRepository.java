package com.Spring.MyPostBank.Repositories;

import com.Spring.MyPostBank.Enums.CheckBookStatus;
import com.Spring.MyPostBank.Models.Checkbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckBookRepository extends JpaRepository<Checkbook, Integer> {
    List<Checkbook> findByUserId(Integer userId);

    Checkbook findByIdAndUserId(Integer checkbookId, Integer id);

    List<Checkbook> findAllByStatus(CheckBookStatus checkBookStatus);
}
