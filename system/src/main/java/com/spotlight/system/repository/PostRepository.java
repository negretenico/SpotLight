package com.spotlight.system.repository;

import com.spotlight.system.model.Post;
import com.spotlight.system.model.PostSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value = """
                SELECT
                    p.id AS postId,
                    p.content AS content,
                    p.created_at AS createdAt,
                    u.username AS username,
                    p.image as imageUrl,
                    (SELECT COUNT(1) FROM Likes l WHERE l.post_id = p.id) AS likeCount,
                    (SELECT COUNT(1) FROM Comment c WHERE c.post_id = p.id) AS commentCount
                FROM Post p
                JOIN Users u ON p.user_id = u.id
                JOIN Followers f ON p.user_id = f.following_id
                WHERE f.follower_id = :followerId
                ORDER BY p.created_at DESC
            """,
            countQuery = """
                        SELECT COUNT(*)
                        FROM Post p
                        JOIN Users u ON p.user_id = u.id
                        JOIN Followers f ON p.user_id = f.following_id
                        WHERE f.follower_id = :followerId
                    """,
            nativeQuery = true)
    Page<PostSummary> getFeed(@Param("followerId") int followerId, Pageable pageable);

}
