package com.Spring.MyPostBank.Authentication;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) throws MessagingException {
        return ResponseEntity.ok(service.register(request));
    }

    @Operation(summary = "Authenticate user")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @Operation(summary = "Refresh authentication token")
    @PostMapping("/refresh")
    public void refresh(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }

    @Operation(summary = "Activate user account")
    @GetMapping("/activate-account")
    public void confirm(
            @Valid  @Parameter(in = ParameterIn.QUERY, description = "Activation token") @RequestParam String token
    ) throws MessagingException {
        service.activateAccount(token);
    }

    @Operation(summary = "Send password reset email")
    @PostMapping("/send-reset-email")
    public ResponseEntity<Void> sendResetEmail(@RequestParam String email) throws MessagingException {
        service.sendPasswordResetEmail(email);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Reset password")
    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword
    ) {
        service.resetPassword(token, newPassword);
        return ResponseEntity.ok().build();
    }


}
