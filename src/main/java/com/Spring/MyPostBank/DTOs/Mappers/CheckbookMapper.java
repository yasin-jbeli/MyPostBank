package com.Spring.MyPostBank.DTOs.Mappers;

import com.Spring.MyPostBank.DTOs.CheckbookDTO;
import com.Spring.MyPostBank.Models.Checkbook;
import com.Spring.MyPostBank.Enums.CheckBookStatus;
import org.springframework.stereotype.Component;

@Component
public class CheckbookMapper {

    public static CheckbookDTO toDTO(Checkbook checkbook) {
        CheckbookDTO checkbookDTO = new CheckbookDTO();
        checkbookDTO.setId(checkbook.getId());
        checkbookDTO.setCheckbookNo(checkbook.getCheckbookNo());
        checkbookDTO.setStatus(checkbook.getStatus());
        checkbookDTO.setCreatedOn(checkbook.getCreatedDate());
        checkbookDTO.setOwner(checkbook.getUser().getFirstName()+" "+checkbook.getUser().getLastName());
        return checkbookDTO;
    }
}
