package com.spotlight.system.service.model;

import com.spotlight.system.model.BlacklistToken;
import com.spotlight.system.repository.BlacklistRepository;
import com.spotlight.system.service.jwt.JWTService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class BlacklistTokenService {
    private final BlacklistRepository blacklistRepository;
    private final JWTService jwtService;

    public BlacklistTokenService(BlacklistRepository blacklistRepository, JWTService jwtService) {
        this.blacklistRepository = blacklistRepository;
        this.jwtService = jwtService;
    }

    public void blacklist(String token) {
        Date date = jwtService.getExpirationTimeFromJwt(token);

        // Convert Date to LocalDateTime using the system default time zone
        LocalDateTime expirationTime = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        BlacklistToken blacklistToken = new BlacklistToken(token, expirationTime);
        blacklistRepository.save(blacklistToken);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistRepository.existsByToken(token);
    }
}
