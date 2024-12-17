package com.spotlight.system.controller;

import com.spotlight.system.model.User;
import com.spotlight.system.model.auth.AuthenticationLogoutRequest;
import com.spotlight.system.model.auth.AuthenticationRequest;
import com.spotlight.system.model.auth.AuthenticationResponse;
import com.spotlight.system.model.utils.RegistrationStatus;
import com.spotlight.system.service.AuthenticateSaveService;
import com.spotlight.system.service.model.LogoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/auth")
public class AuthController {
    AuthenticateSaveService authenticateSaveService;
    LogoutService logoutService;

    public AuthController(AuthenticateSaveService authenticateSaveService, LogoutService logoutService) {
        this.authenticateSaveService = authenticateSaveService;
        this.logoutService = logoutService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User user) {
        Optional<String> registrationStatus = authenticateSaveService.register(user);
        if (registrationStatus.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        String status = registrationStatus.get();
        if (status.equals(RegistrationStatus.EMAIL_EXISTS.name())) {
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder().error("This email is already taken").build());
        }
        if (status.equals(RegistrationStatus.USERNAME_EXISTS.name())) {
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder().error("This  user is already taken").build());
        }
        return ResponseEntity.ok(AuthenticationResponse.builder().accessToken(status).build());
    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        Optional<String> possibleToken = authenticateSaveService.login(authenticationRequest);
        return possibleToken.map(token -> ResponseEntity.ok(AuthenticationResponse.builder().accessToken(token).build()))
                .orElse(ResponseEntity.badRequest().body(AuthenticationResponse.builder().error("Could not create token").build()));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody AuthenticationLogoutRequest logoutRequest) {
        logoutService.logout(logoutRequest.getAccessToken());
        return ResponseEntity.ok("Logged out successfully");
    }
}
