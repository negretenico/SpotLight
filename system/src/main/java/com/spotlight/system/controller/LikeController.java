package com.spotlight.system.controller;

import com.spotlight.system.model.User;
import com.spotlight.system.model.likes.LikeRequest;
import com.spotlight.system.service.model.LikeService;
import com.spotlight.system.service.model.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(value = "/api/like")
public class LikeController {
    UserService userService;
    LikeService likeService;

    public LikeController(UserService userService, LikeService likeService) {
        this.userService = userService;
        this.likeService = likeService;
    }

    @PostMapping
    public ResponseEntity<String> updateLikes(@RequestBody LikeRequest likeRequest) {
        // Extract userId from the JWT
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not available"));
        likeService.updateLikes(likeRequest, user.getId().intValue());
        return ResponseEntity.ok("Updating likes");
    }
}
