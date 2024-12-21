package com.spotlight.system.model.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spotlight.system.model.comment.Comment;
import com.spotlight.system.model.followers.Followers;
import com.spotlight.system.model.likes.Likes;
import com.spotlight.system.model.post.Post;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Users")
public class User {
    @Column(unique = true)
    private String email;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String password;

    // Posts created by the user
    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Post> posts;

    // Comments made by the user
    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Comment> comments;

    // Likes made by the user
    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Likes> likes;

    // Followers of this user
    @OneToMany(mappedBy = "followingId", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Followers> followers;

    // Users this user is following
    @OneToMany(mappedBy = "followerId", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Followers> following;
}