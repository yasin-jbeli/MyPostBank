package com.Spring.MyPostBank.Services;


import com.Spring.MyPostBank.DTOs.CreditDTO;
import com.Spring.MyPostBank.DTOs.RepaymentDetailDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@Service
public interface CreditService {

    void requestLoan(BigDecimal amount,BigDecimal rate,Integer duration,Integer accountId, Principal connectedUser, MultipartFile applicationForm, MultipartFile bankStatements, MultipartFile proofOfIncome);

    List<CreditDTO> getLoansByUser(Principal connectedUser);

    CreditDTO getLoanById(Integer creditId, Principal connectedUser);

    List<RepaymentDetailDTO> getDuePayments(Principal connectedUser, Integer creditId);

    List<RepaymentDetailDTO> getPaidPayments(Principal connectedUser, Integer creditId);

    List<RepaymentDetailDTO> getAllRepaymentsByUser(Principal connectedUser, Integer creditId);

    CreditDTO getOngoingLoans(Principal connectedUser);
}
