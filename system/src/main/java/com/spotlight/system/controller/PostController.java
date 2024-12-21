package com.spotlight.system.controller;

import com.spotlight.system.model.post.Post;
import com.spotlight.system.model.post.PostRequest;
import com.spotlight.system.model.user.User;
import com.spotlight.system.service.model.PostService;
import com.spotlight.system.service.model.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/post")
public class PostController {
    PostService postService;
    UserService userService;

    public PostController(UserService userService, PostService postService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Post> create(@RequestBody PostRequest commentRequest) {
        // Extract userId from the JWT
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not available"));
        return ResponseEntity.ok(postService.save(commentRequest, user.getId().intValue()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Post> getPost(@PathVariable int id) {
        Optional<Post> possiblePost = postService.getPost(id);
        return possiblePost.map(ResponseEntity::ok).orElse(ResponseEntity.noContent().build());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deletePost(@PathVariable int id) {
        postService.delete(id);
        return ResponseEntity.ok(String.format("Deleted comment %s", id));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Post> updateComment(@PathVariable int id, @RequestBody PostRequest postRequest) {
        Optional<Post> possiblePost = postService.update(id, (post) -> {
            post.setContent(postRequest.content());
            post.setImgUrl(postRequest.imageUrl());
        });
        return possiblePost.map(ResponseEntity::ok).orElse(ResponseEntity.noContent().build());
    }
}
