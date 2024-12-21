package com.spotlight.system.controller;

import com.spotlight.system.model.user.User;
import com.spotlight.system.model.user.UserResponse;
import com.spotlight.system.service.model.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserResponse> getUser() {
        // Extract userId from the JWT
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not available"));
        return ResponseEntity.ok(UserResponse.builder()
                .id(user.getId())
                .posts(user.getPosts())
                .comments(user.getComments())
                .likes(user.getLikes())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .following(user.getFollowing())
                .followers(user.getFollowers())
                .username(user.getUsername())
                .build());
    }
}
