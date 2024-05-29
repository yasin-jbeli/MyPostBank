package com.Spring.MyPostBank.Repositories;

import com.Spring.MyPostBank.Models.Credit;
import com.Spring.MyPostBank.Models.Notification;
import com.Spring.MyPostBank.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findByUserId(Integer id);
}
