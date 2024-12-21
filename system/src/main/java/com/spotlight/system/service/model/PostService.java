package com.spotlight.system.service.model;

import com.spotlight.system.model.Post;
import com.spotlight.system.model.post.PostRequest;
import com.spotlight.system.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;
import java.util.function.Consumer;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post save(PostRequest postRequest, long userId) {
        Post toSave = new Post();
        toSave.setCreatedAt(Timestamp.from(Instant.now()));
        toSave.setUserId(userId);
        toSave.setContent(postRequest.content());
        toSave.setImgUrl(postRequest.imageUrl());
        return postRepository.save(toSave);
    }

    public Optional<Post> getPost(int id) {
        return postRepository.findById(id);
    }

    public void delete(int id) {
        postRepository.deleteById(id);
    }

    public Optional<Post> update(int id, Consumer<Post> patcher) {
        Optional<Post> possiblePost = getPost(id);
        if (possiblePost.isEmpty()) {
            return Optional.empty();
        }
        Post comment = possiblePost.get();
        patcher.accept(comment);
        return Optional.of(postRepository.save(comment));
    }
}
