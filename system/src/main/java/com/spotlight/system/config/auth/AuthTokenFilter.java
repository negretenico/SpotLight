package com.spotlight.system.config.auth;

import com.spotlight.system.service.jwt.JWTService;
import com.spotlight.system.service.model.UserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final UserDetailService userService;

    public AuthTokenFilter(JWTService jwtService, UserDetailService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String path = request.getServletPath();

        // Skip JWT validation for public endpoints
        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }
        Optional<String> possibleJWT = parseJwt(request);
        if (possibleJWT.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwt = possibleJWT.get();
        if (!jwtService.validateJwtToken(jwt)) {
            filterChain.doFilter(request, response);
            return;
        }
        String username = jwtService.getUsernameFromJwt(jwt);
        UserDetails userDetails = userService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }


    private Optional<String> parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (!(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer "))) {
            return Optional.empty();
        }
        return Optional.of(headerAuth.substring(7));
    }
}