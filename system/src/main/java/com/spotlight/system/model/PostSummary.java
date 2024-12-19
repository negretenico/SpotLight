package com.spotlight.system.model;

import java.time.LocalDateTime;

public interface PostSummary {
    Integer getPostId();

    String getContent();

    LocalDateTime getCreatedAt();

    String getUsername();

    Integer getLikeCount();

    Integer getCommentCount();
}
