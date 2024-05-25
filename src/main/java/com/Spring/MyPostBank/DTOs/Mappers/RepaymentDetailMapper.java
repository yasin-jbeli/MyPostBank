package com.Spring.MyPostBank.DTOs.Mappers;

import com.Spring.MyPostBank.DTOs.RepaymentDetailDTO;
import com.Spring.MyPostBank.Models.RepaymentDetail;
import org.springframework.stereotype.Component;

@Component
public class RepaymentDetailMapper {

    public RepaymentDetailDTO toDTO(RepaymentDetail repaymentDetail) {
        RepaymentDetailDTO repaymentDetailDTO = new RepaymentDetailDTO();
        repaymentDetailDTO.setMonth(repaymentDetail.getMonth());
        repaymentDetailDTO.setDueDate(repaymentDetail.getDueDate());
        repaymentDetailDTO.setPrincipalPayment(repaymentDetail.getPrincipalPayment());
        repaymentDetailDTO.setInterestPayment(repaymentDetail.getInterestPayment());
        repaymentDetailDTO.setRemainingBalance(repaymentDetail.getRemainingBalance());
        repaymentDetailDTO.setPaymentAmount(repaymentDetail.getPaymentAmount());
        repaymentDetailDTO.setPaymentStatus(repaymentDetail.getPaymentStatus());
        return repaymentDetailDTO;
    }
}

