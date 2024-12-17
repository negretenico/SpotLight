package com.spotlight.system.model.auth;

import lombok.Data;

@Data
public class AuthenticationRequest {
    String username;
    String password;
}
