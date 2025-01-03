package com.spotlight.system.service.model;

import com.spotlight.system.model.comment.Comment;
import com.spotlight.system.model.comment.CommentRequest;
import com.spotlight.system.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;
import java.util.function.Consumer;

@Service
public class CommentService {
    CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment save(CommentRequest commentRequest, int userId) {
        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setPostId(commentRequest.getPostId());
        comment.setUserId((long) userId);
        comment.setCreatedAt(Timestamp.from(Instant.now()));
        return commentRepository.save(comment);
    }

    public Optional<Comment> getComment(int id) {
        return commentRepository.findById(id);
    }

    public void delete(int id) {
        commentRepository.deleteById(id);
    }

    public Optional<Comment> update(int id, Consumer<Comment> patcher) {
        Optional<Comment> possibleComment = getComment(id);
        if (possibleComment.isEmpty()) {
            return Optional.empty();
        }
        Comment comment = possibleComment.get();
        patcher.accept(comment);
        return Optional.of(commentRepository.save(comment));
    }
}