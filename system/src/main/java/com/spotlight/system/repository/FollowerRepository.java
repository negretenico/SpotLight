package com.spotlight.system.repository;

import com.spotlight.system.model.followers.Followers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Followers, Integer> {
}
