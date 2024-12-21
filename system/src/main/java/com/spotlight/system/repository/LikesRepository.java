package com.spotlight.system.repository;

import com.spotlight.system.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
    @Query("""
            SELECT l
            FROM Likes l
            WHERE l.userId = :userId AND l.postId = :postId
            """)
    Optional<Likes> getByUserIdAndParentId(@Param("userId") Long userId, @Param("postId") Integer postId);


}
