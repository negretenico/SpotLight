package com.spotlight.system.service.model;

import com.spotlight.system.model.user.User;
import com.spotlight.system.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<User> possibleUser = userRepository.findByUsername(username);
        if (possibleUser.isEmpty()) {
            throw new UsernameNotFoundException(String.format("User not found with the given username=%s", username));
        }
        User user = possibleUser.get();
        return org.springframework.security.core.userdetails.User.builder().username(user.getUsername()).password(user.getPassword()).build();
    }
}
