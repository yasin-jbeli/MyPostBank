package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.DTOs.BankAccountDTO;
import com.Spring.MyPostBank.DTOs.CardDTO;
import com.Spring.MyPostBank.DTOs.Mappers.CardMapper;
import com.Spring.MyPostBank.Enums.AccountStatus;
import com.Spring.MyPostBank.Enums.AccountType;
import com.Spring.MyPostBank.Enums.CardStatus;
import com.Spring.MyPostBank.Models.BankAccount;
import com.Spring.MyPostBank.Models.Card;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.BankAccountRepository;
import com.Spring.MyPostBank.Repositories.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final BankAccountRepository accountRepository;
    private final CardRepository cardRepository;
    private final TextEncryptor textEncryptor;
    private final CardMapper cardMapper;


    private final Function<String, String> maskCardNumber = cardNo -> {
        int maskLength = cardNo.length() - 10;
        if (maskLength <= 0) {
            return cardNo;
        }
        return "X".repeat(maskLength) + cardNo.substring(maskLength);
    };

    @Override
    public List<CardDTO> getPendingCards() {
        return cardRepository.findByStatus(CardStatus.PENDING)
                .stream()
                .map(card -> {
                    CardDTO dto = CardMapper.mapToDTO(card);
                    dto.setCardNo(maskCardNumber.apply(dto.getCardNo()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void approveCard(Integer cardId) {
        Optional<Card> optionalCard = cardRepository.findById(cardId);
        if (optionalCard.isPresent()) {
            Card card = optionalCard.get();
            card.setStatus(CardStatus.ACTIVE);
            cardRepository.save(card);
        }
    }

    @Override
    public void rejectCard(Integer cardId) {
        if (cardRepository.existsById(cardId)) {
            cardRepository.deleteById(cardId);
        }
    }

    @Override
    public void deleteCard(Integer cardId) {
        if (accountRepository.existsById(cardId)) {
            accountRepository.deleteById(cardId);
        }
    }

    @Override
    public List<CardDTO> getAllCards() {
        List<Card> cards = cardRepository.findAll();
        return cards.stream()
                .map(card -> {
                    CardDTO dto = CardMapper.mapToDTO(card);
                    dto.setCardNo(maskCardNumber.apply(textEncryptor.decrypt(dto.getCardNo())));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<CardDTO> getUserCards(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<Card> userCards = cardRepository.findByUserId(user.getId());
        return userCards.stream()
                .peek(card -> card.setCardNo(textEncryptor.decrypt(card.getCardNo())))
                .peek(card -> card.setCardNo(maskCardNumber.apply(card.getCardNo())))
                .map(CardMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CardDTO> getCardById(Integer cardId, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Optional<Card> cardOptional = cardRepository.findByIdAndUserId(cardId, user.getId());
        return cardOptional.map(card -> {
            card.setCardNo(textEncryptor.decrypt(card.getCardNo()));
            card.setCardNo(maskCardNumber.apply(card.getCardNo()));
            return card;
        }).map(CardMapper::mapToDTO);
    }

    @Override
    public void requestCard(Principal connectedUser, Integer accountId) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        BankAccount account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (account.getAccountType() != AccountType.CHECKING) {
            throw new IllegalStateException("You can only add a card to a CHECKING account");
        }

        if (!account.getStatus().equals(AccountStatus.ACTIVE)) {
            throw new IllegalStateException("Cannot request a card for an account with pending status");
        }

        String cardNo = textEncryptor.encrypt(generateCardNo());

        Card card = Card.builder()
                .cardNo(cardNo)
                .status(CardStatus.PENDING)
                .expirationDate(LocalDate.now().plusYears(3))
                .account(account)
                .user(user)
                .build();
        cardRepository.save(card);
    }


    @Override
    public void deactivateCard(Integer cardId, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Optional<Card> cardOptional = cardRepository.findByIdAndUserId(cardId, user.getId());
        if (cardOptional.isPresent()) {
            Card card = cardOptional.get();
            if (card.getStatus().equals(CardStatus.ACTIVE)){
                card.setStatus(CardStatus.BLOCKED);
                cardRepository.save(card);
            }
            else {
                throw new IllegalStateException("card can not be deactivated.");
            }
        }
    }

    @Override
    public void activateCard(Integer cardId, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Optional<Card> cardOptional = cardRepository.findByIdAndUserId(cardId, user.getId());
        if (cardOptional.isPresent()) {
            Card card = cardOptional.get();
            if(card.getStatus().equals(CardStatus.BLOCKED)) {
                card.setStatus(CardStatus.ACTIVE);
                cardRepository.save(card);
            }
            else {
                throw new IllegalStateException("Card can not be activated.");
            }
        }
    }

    @Override
    public ResponseEntity<String> cancelCardRequest(Integer cardId, Principal principal) {
        User user = (User)((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        Optional<Card> optionalCard = cardRepository.findById(cardId);
        if (optionalCard.isPresent() && optionalCard.get().getUser().getId().equals(user.getId())) {
            cardRepository.deleteById(cardId);
            return ResponseEntity.ok("Card with ID "+cardId+" canceled successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to cancel this card.");
        }
    }

    @Override
    public String generateCardNo() {
        Random random = new Random();
        StringBuilder cardNumber = new StringBuilder();

        for (int i = 0; i < 4; i++) {
            cardNumber.append(1000 + random.nextInt(9000));
            if (i < 3) {
                cardNumber.append("-");
            }
        }

        return cardNumber.toString();
    }


    @Override
    public List<CardDTO> getCardsByAccount(Principal connectedUser, Integer accountId) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<Card> userCards = cardRepository.findByUserIdAndAccountId(user.getId(), accountId);
        return userCards.stream()
                .peek(card -> card.setCardNo(textEncryptor.decrypt(card.getCardNo())))
                .map(CardMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCardById(Integer cardId, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Optional<Card> card = cardRepository.findByIdAndUserId(cardId,user.getId());
        if(card.isPresent()) {
            cardRepository.deleteById(cardId);
        }
    }
}
