package com.spotlight.system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Followers")
public class Followers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "follower_id", nullable = false)
    private Long followerId;

    @Column(name = "following_id", nullable = false)
    private Long followingId;
}
