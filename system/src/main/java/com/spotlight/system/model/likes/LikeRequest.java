package com.spotlight.system.model.likes;

import lombok.Data;

@Data
public class LikeRequest {
    boolean liked;
    Likes like;
}
