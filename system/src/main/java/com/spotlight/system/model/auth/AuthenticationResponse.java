package com.spotlight.system.model.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private String accessToken;
    private String error;
    //TODO: likely put this back
//    private  String refreshToken;
//    private long expiresAt;
//    private String username;
}
