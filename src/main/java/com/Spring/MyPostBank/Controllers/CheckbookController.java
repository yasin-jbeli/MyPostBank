package com.Spring.MyPostBank.Controllers;


import com.Spring.MyPostBank.DTOs.CheckbookDTO;
import com.Spring.MyPostBank.Services.CheckbookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("user/checkbooks")
public class CheckbookController {

    private final CheckbookService checkbookService;

    @PostMapping("/request-checkbook")
    @Operation(summary = "Request a new checkbook")
    public ResponseEntity<?> addCheckbook(Principal connectedUser) {
        checkbookService.requestCheckbook(connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/")
    @Operation(summary = "Get all checkbooks by user")
    public ResponseEntity<List<CheckbookDTO>> getCheckbookByUserId(Principal connectedUser) {
        List<CheckbookDTO> checkbookDTOs = checkbookService.getCheckbookByUserId(connectedUser);
        return ResponseEntity.ok(checkbookDTOs);
    }

    @GetMapping("/{checkbookId}")
    @Operation(summary = "Get checkbook by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved checkbook"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Checkbook not found")
    })
    public ResponseEntity<CheckbookDTO> getCheckbookByUserId(
            @PathVariable Integer checkbookId,
            @Parameter(description = "Connected user") Principal connectedUser
    ) {
        CheckbookDTO checkbookDTO = checkbookService.getCheckbookById(checkbookId, connectedUser);
        if (checkbookDTO != null) {
            return ResponseEntity.ok(checkbookDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
