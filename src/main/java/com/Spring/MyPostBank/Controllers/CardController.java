package com.Spring.MyPostBank.Controllers;

import com.Spring.MyPostBank.DTOs.CardDTO;
import com.Spring.MyPostBank.Services.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("user/cards")
public class CardController {

    private final CardService cardService;

    @Operation(summary = "Get all user cards")
    @GetMapping("/")
    public List<CardDTO> getUserCards(Principal connectedUser) {
        return cardService.getUserCards(connectedUser);
    }

    @Operation(summary = "Get cards by account ID")
    @GetMapping("{accountId}/all")
    public List<CardDTO> getCardsByAccount(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Account ID") @PathVariable Integer accountId,
            Principal connectedUser
    ) {
        return cardService.getCardsByAccount(connectedUser, accountId);
    }

    @Operation(summary = "Get card by ID")
    @GetMapping("/{cardId}")
    public Optional<CardDTO> getCardById(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId,
            Principal connectedUser
    ) {
        return cardService.getCardById(cardId, connectedUser);
    }

    @Operation(summary = "Deactivate card by ID")
    @PutMapping("/{cardId}/deactivate")
    public ResponseEntity<String> deactivateCard(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId,
            Principal connectedUser
    ) {
        cardService.deactivateCard(cardId, connectedUser);
        return ResponseEntity.ok("Card with ID " + cardId + " deactivated");
    }

    @Operation(summary = "Activate card by ID")
    @PutMapping("/{cardId}/activate")
    public ResponseEntity<String> activateCard(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId,
            Principal connectedUser
    ) {
        cardService.activateCard(cardId, connectedUser);
        return ResponseEntity.ok("Card with ID " + cardId + " activated");
    }

    @Operation(summary = "Cancel card request by ID")
    @DeleteMapping("/{cardId}/cancel-request")
    public ResponseEntity<String> cancelCardRequest(
            @Valid @Parameter(in = ParameterIn.PATH, description = "Card ID") @PathVariable Integer cardId,
            Principal principal
    ) {
        return cardService.cancelCardRequest(cardId, principal);
    }

    @Operation(summary = "Request a new card for an account")
    @PostMapping("/request-card")
    public ResponseEntity<String> requestCard(
            @Valid @Parameter(in = ParameterIn.QUERY, description = "Account ID") @RequestParam Integer accountId,
            Principal connectedUser
    ) {
        cardService.requestCard(connectedUser, accountId);
        return ResponseEntity.ok("Card requested successfully");
    }

    @Operation(summary = "delete card")
    @DeleteMapping("/{cardId}/delete")
    public ResponseEntity<String> deleteCard(
            @Valid @Parameter(in = ParameterIn.QUERY, description = "card id") @PathVariable Integer cardId,
            Principal connectedUser
    ) {
        cardService.deleteCardById(cardId, connectedUser);
        return ResponseEntity.ok("Card with ID " + cardId + " deleted successfully");
    }

}
