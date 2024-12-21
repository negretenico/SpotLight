package com.spotlight.system.service.model;

import com.spotlight.system.model.likes.LikeRequest;
import com.spotlight.system.model.likes.Likes;
import com.spotlight.system.repository.LikesRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

@Service
public class LikeService {
    LikesRepository likesRepository;

    public LikeService(LikesRepository likesRepository) {
        this.likesRepository = likesRepository;
    }


    public void updateLikes(LikeRequest likeRequest, int userId) {
        if (!likeRequest.isLiked()) {
            Likes likeToSave = new Likes();
            likeToSave.setCreatedAt(Timestamp.from(Instant.now()));
            likeToSave.setPostId(likeRequest.getLike().getPostId());
            likeToSave.setUserId((long) userId);
            save(likeToSave);
            return;
        }
        removeLike(likeRequest.getLike().getPostId(), userId);

    }

    private void save(Likes likes) {
        likesRepository.save(likes);
    }

    @Transactional
    private void removeLike(int postId, int userId) {
        Optional<Likes> possibleLikes = likesRepository.getByUserIdAndParentId((long) userId, postId);
        possibleLikes.ifPresent(likes -> {
            likesRepository.deleteById(likes.getId());
            likesRepository.flush();
        });
    }
}
