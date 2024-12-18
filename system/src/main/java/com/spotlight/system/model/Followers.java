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

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private User following;
}
