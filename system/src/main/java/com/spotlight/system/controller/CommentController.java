package com.spotlight.system.controller;

import com.spotlight.system.model.Comment;
import com.spotlight.system.model.User;
import com.spotlight.system.model.comment.CommentRequest;
import com.spotlight.system.service.model.CommentService;
import com.spotlight.system.service.model.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/comment")
public class CommentController {
    CommentService commentService;
    UserService userService;

    public CommentController(UserService userService, CommentService commentService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Comment> create(@RequestBody CommentRequest commentRequest) {
        // Extract userId from the JWT
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not available"));
        return ResponseEntity.ok(commentService.save(commentRequest, user.getId().intValue()));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable int id) {
        Optional<Comment> possibleComment = commentService.getComment(id);
        return possibleComment.map(ResponseEntity::ok).orElse(ResponseEntity.noContent().build());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable int id) {
        commentService.delete(id);
        return ResponseEntity.ok(String.format("Deleted comment %s", id));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable int id, @RequestBody CommentRequest commentRequest) {
        Optional<Comment> possibleComment = commentService.update(id, (comment) -> {
            comment.setContent(commentRequest.getContent());
        });
        return possibleComment.map(ResponseEntity::ok).orElse(ResponseEntity.noContent().build());
    }
}
