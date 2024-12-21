package com.spotlight.system.controller;

import com.spotlight.system.model.post.PostSummary;
import com.spotlight.system.model.user.User;
import com.spotlight.system.service.model.FeedService;
import com.spotlight.system.service.model.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/feed")
public class FeedController {
    UserService userService;
    FeedService feedService;

    public FeedController(UserService userService, FeedService feedService) {
        this.userService = userService;
        this.feedService = feedService;
    }

    @GetMapping
    public ResponseEntity<Page<PostSummary>> getNewsFeed(Pageable pageable) {
        // Extract userId from the JWT
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not available"));
        // Fetch the feed for the user
        Page<PostSummary> postSummaries = feedService.getFeed(user.getId().intValue(), pageable);
        if (postSummaries.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return HTTP 204 if no content
        }
        return ResponseEntity.ok(postSummaries); // Return the paginated feed
    }
}
