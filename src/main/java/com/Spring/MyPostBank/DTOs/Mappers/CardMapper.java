package com.Spring.MyPostBank.DTOs.Mappers;

import com.Spring.MyPostBank.DTOs.CardDTO;
import com.Spring.MyPostBank.Models.Card;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Component
public class CardMapper {

    public static CardDTO mapToDTO(Card card) {
        CardDTO cardDTO = new CardDTO();
        cardDTO.setCardId(card.getId());
        cardDTO.setCardNo(card.getCardNo());
        cardDTO.setStatus(card.getStatus());
        cardDTO.setExpirationDate(card.getExpirationDate());
        cardDTO.setAccountId(card.getAccount().getId());
        cardDTO.setUserId(card.getUser().getId());
        cardDTO.setCreateDate(card.getCreatedDate());
        cardDTO.setOwner(card.getUser().getFirstName()+" "+card.getUser().getLastName());
        return cardDTO;
    }


}
