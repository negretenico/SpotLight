package com.spotlight.system.model.comment;

import lombok.Data;

@Data
public class CommentRequest {
    String content;
    int postId;
}