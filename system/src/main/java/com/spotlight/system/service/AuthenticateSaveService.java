package com.spotlight.system.service;

import com.spotlight.system.model.auth.AuthenticationRequest;
import com.spotlight.system.model.user.User;
import com.spotlight.system.model.utils.RegistrationStatus;
import com.spotlight.system.service.jwt.JWTService;
import com.spotlight.system.service.model.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticateSaveService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticateSaveService.class);
    UserService userService;
    JWTService jwtService;
    PasswordEncoder passwordEncoder;
    AuthenticationManager authenticationManager;

    public AuthenticateSaveService(UserService userService, JWTService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<String> register(User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return Optional.of(RegistrationStatus.USERNAME_EXISTS.name());
        }
        if (userService.existsByEmail(user.getEmail())) {
            return Optional.of(RegistrationStatus.EMAIL_EXISTS.name());
        }
        User toSave = new User();
        toSave.setEmail(user.getEmail());
        toSave.setPassword(passwordEncoder.encode(user.getPassword()));
        toSave.setUsername(user.getUsername());
        userService.save(toSave);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return Optional.of(jwtService.generateJwtToken(authentication));
    }

    public Optional<String> login(AuthenticationRequest authenticationRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            return Optional.of(jwtService.generateJwtToken(authentication));
        } catch (Exception e) {
            System.out.printf(e.getMessage());
            return Optional.empty();
        }
    }
}