package com.Spring.MyPostBank.Repositories;

import com.Spring.MyPostBank.DTOs.RepaymentDetailDTO;
import com.Spring.MyPostBank.Enums.PaymentStatus;
import com.Spring.MyPostBank.Models.Credit;
import com.Spring.MyPostBank.Models.RepaymentDetail;
import com.Spring.MyPostBank.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RepaymentDetailRepository extends JpaRepository<RepaymentDetail, Integer> {

    List<RepaymentDetail> findByPaymentStatus(PaymentStatus paymentStatus);

    List<RepaymentDetail> findAllByUserAndCredit(User user, Credit credit);

    List<RepaymentDetail> findByUserAndPaymentStatusAndCredit(User user, PaymentStatus paymentStatus, Credit credit);

    List<RepaymentDetail> findByDueDateAndPaymentStatus(LocalDate localdate, PaymentStatus paymentStatus);

    List<RepaymentDetail> findByCreditId(Integer creditId);
}
