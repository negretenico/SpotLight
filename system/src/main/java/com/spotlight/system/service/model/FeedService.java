package com.spotlight.system.service.model;

import com.spotlight.system.model.PostSummary;
import com.spotlight.system.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FeedService {
    private final PostRepository postRepository;

    public FeedService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Page<PostSummary> getFeed(int userId, Pageable pageable) {
        return postRepository.getFeed((long) userId, pageable);
    }

}
