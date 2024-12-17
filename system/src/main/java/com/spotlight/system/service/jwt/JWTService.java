package com.spotlight.system.service.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
@Slf4j
public class JWTService {
    private final String jwtSecret;

    private final int jwtExpiration;

    public JWTService(@Value("${app.jwtSecret}") String jwtSecret, @Value("${app.jwtExpiration}") int jwtExpiration) {
        this.jwtExpiration = jwtExpiration;
        this.jwtSecret = jwtSecret;
    }

    private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateJwtToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpiration))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT Token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("Token expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("Token not supported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("Token is empty: {}", e.getMessage());
        }

        return false;
    }

    public String getUsernameFromJwt(String authToken) {
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(authToken).getBody().getSubject();
    }
}
