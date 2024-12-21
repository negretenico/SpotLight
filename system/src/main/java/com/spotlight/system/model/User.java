package com.spotlight.system.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Users")
public class User {
    @Column(unique = true)
    String email;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;


    // Storing only the IDs instead of mapped entities
    @ElementCollection
    @CollectionTable(name = "user_post_ids", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "post_id")
    private List<Long> postIds;

    @ElementCollection
    @CollectionTable(name = "user_comment_ids", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "comment_id")
    private List<Long> commentIds;

    @ElementCollection
    @CollectionTable(name = "user_like_ids", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "like_id")
    private List<Long> likeIds;

    @ElementCollection
    @CollectionTable(name = "user_following_ids", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "following_id")
    private List<Long> followingIds;

    @ElementCollection
    @CollectionTable(name = "user_follower_ids", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "follower_id")
    private List<Long> followerIds;
}
