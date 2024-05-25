package com.Spring.MyPostBank.DTOs.Mappers;

import com.Spring.MyPostBank.DTOs.CreditDTO;
import com.Spring.MyPostBank.Models.Credit;

import org.springframework.stereotype.Component;

@Component
public class CreditMapper {

    public CreditDTO toDTO(Credit credit) {
        CreditDTO dto = new CreditDTO();
        dto.setId(credit.getId());
        dto.setAmount(credit.getAmount());
        dto.setInterestRate(credit.getInterestRate());
        dto.setStatus(credit.getStatus());
        dto.setDuration(credit.getDuration());
        dto.setAccount(credit.getAccount().getId());
        dto.setOwner(credit.getUser().getFirstName()+" "+credit.getUser().getLastName());
        dto.setCreatedOn(credit.getCreatedDate());
        return dto;
    }
}
