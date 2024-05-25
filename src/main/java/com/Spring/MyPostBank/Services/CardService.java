package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.CardDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public interface CardService {

    List<CardDTO> getPendingCards();

    void approveCard(Integer cardId);

    void rejectCard(Integer cardId);

    void deleteCard(Integer cardId);

    List<CardDTO> getAllCards();

    List<CardDTO> getUserCards(Principal connectedUser);

    Optional<CardDTO> getCardById(Integer cardId, Principal connectedUser);

    void requestCard(Principal connectedUser, Integer accountId);

    void deactivateCard(Integer cardId, Principal connectedUser);

    void activateCard(Integer cardId, Principal connectedUser);

    ResponseEntity<String> cancelCardRequest(Integer cardId, Principal principal);


    String generateCardNo();

    List<CardDTO> getCardsByAccount(Principal connectedUser, Integer accoutnId);

    void deleteCardById(Integer cardId, Principal connectedUser);
}
