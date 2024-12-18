package com.spotlight.system.config;

import com.spotlight.system.config.auth.AuthEntryPoint;
import com.spotlight.system.config.auth.AuthTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
    private final DaoAuthenticationProvider authenticationProvider;
    private final AuthEntryPoint authEntryPoint;
    private final AuthTokenFilter authTokenFilter;

    public WebSecurityConfig(DaoAuthenticationProvider authenticationProvider, AuthTokenFilter authTokenFilter, AuthEntryPoint authEntryPoint) {
        this.authenticationProvider = authenticationProvider;
        this.authEntryPoint = authEntryPoint;
        this.authTokenFilter = authTokenFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions().sameOrigin()) // Allow frames only from the same origin
                .exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/h2-console/**").permitAll() // Allow access to H2 Console
                                .requestMatchers("/api/auth/**").permitAll()
                                .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider);

        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}