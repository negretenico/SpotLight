package com.spotlight.system.repository;

import com.spotlight.system.model.utils.BlacklistToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlacklistRepository extends JpaRepository<BlacklistToken, Long> {
    boolean existsByToken(String token); // To check if token is blacklisted

    void deleteByToken(String token); // To remove a token from the blacklist
}
