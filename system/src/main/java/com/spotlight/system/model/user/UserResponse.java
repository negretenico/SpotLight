package com.spotlight.system.model.user;

import com.spotlight.system.model.comment.Comment;
import com.spotlight.system.model.followers.Followers;
import com.spotlight.system.model.likes.Likes;
import com.spotlight.system.model.post.Post;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UserResponse {
    Long id;
    String fullName;
    String email;
    String username;
    List<Post> posts;
    List<Comment> comments;
    List<Likes> likes;
    List<Followers> followers;
    List<Followers> following;
}
