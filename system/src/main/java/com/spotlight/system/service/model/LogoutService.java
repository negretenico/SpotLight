package com.spotlight.system.service.model;

import com.spotlight.system.service.jwt.JWTService;
import org.springframework.stereotype.Service;

@Service
public class LogoutService {
    private final BlacklistTokenService blacklistTokenService;
    private final JWTService jwtService;

    public LogoutService(BlacklistTokenService blacklistTokenService, JWTService jwtService) {
        this.jwtService = jwtService;
        this.blacklistTokenService = blacklistTokenService;
    }

    public void logout(String token) {
        if (!jwtService.validateJwtToken(token)) {
            return;
        }
        blacklistTokenService.blacklist(token);

    }
}
