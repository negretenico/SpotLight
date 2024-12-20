package com.spotlight.system.model.likes;

import com.spotlight.system.model.Likes;
import lombok.Data;

@Data
public class LikeRequest {
    boolean liked;
    Likes like;
}
