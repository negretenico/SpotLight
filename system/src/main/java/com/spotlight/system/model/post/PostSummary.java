package com.spotlight.system.model.post;

import java.time.LocalDateTime;

public interface PostSummary {
    Integer getPostId();

    String getContent();

    LocalDateTime getCreatedAt();

    String getUsername();

    String getImageUrl();

    Integer getLikeCount();

    Integer getCommentCount();
}
