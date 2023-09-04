package com.others.KnockKnock.security.oauth.service;

import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.exception.ExceptionCode;
import com.others.KnockKnock.security.oauth.entity.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<User> byUserId = userRepository.findUserById(username);
////
////        User user = byUserId.orElseThrow(() -> new UsernameNotFoundException(ExceptionCode.USER_NOT_FOUND.getMessage()));
////
////        return UserPrincipal.create(user);
        User user = userRepository.findUserById(username);
        if (user == null) {
            throw new UsernameNotFoundException("Can not find username.");
        }
        return UserPrincipal.create(user);
    }

}


