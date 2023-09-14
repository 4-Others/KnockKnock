package com.others.KnockKnock.domain.user.service;


import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.exception.BusinessLogicException;
import com.others.KnockKnock.exception.ExceptionCode;
import com.others.KnockKnock.security.oauth.entity.ProviderType;
import com.others.KnockKnock.security.oauth.entity.RoleType;
import com.others.KnockKnock.security.oauth.token.AuthToken;
import com.others.KnockKnock.security.oauth.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthTokenProvider authTokenProvider;

    public User signup(User user){
        //중복 이메일,Id 체크
        verifyExistsUserEmail(user.getEmail());
        verifyExistsUserId(user.getId());
        //패스워드 encode
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        // 빌더 패턴을 사용하여 User 객체 생성
        User newUser = User.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(encryptedPassword)
                .birth(user.getBirth())
                .pushAgree(user.getPushAgree())
                .emailVerifiedYn("N")
                .providerType(ProviderType.LOCAL)
                .roleType(RoleType.USER)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
        //user 저장
        return userRepository.save(newUser);
    }

    public Optional<User> getUser(String id) {
        return userRepository.findById(id);
    }
    public User getAUser(String id){
        return userRepository.findUserById(id);
    }

    public void updateUserPassword(Long userId, User user) {
        User verifiedUser = findUserByUserId(userId);

        if (passwordEncoder.matches(user.getPassword(), verifiedUser.getPassword()))
            throw new BusinessLogicException(ExceptionCode.NOT_CHANGED_PASSWORD);

        verifiedUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(verifiedUser);
    }

    public void updateUserProfile(Long userId, User updatedUser){
        User existingUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setBirth(updatedUser.getBirth());
        existingUser.setPushAgree(updatedUser.getPushAgree());
        existingUser.setModifiedAt(LocalDateTime.now());
        userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUserByAccessToken(String accessToken) {
        // Access Token을 사용하여 사용자를 식별
        AuthToken authToken = authTokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            // Access Token이 유효하지 않은 경우 예외 처리
            throw new IllegalArgumentException("유효하지 않은 Access Token입니다.");
        }

        // Access Token에서 사용자 ID 추출
        String id = authToken.getTokenClaims().getSubject();

        // 사용자를 ID로 DB에서 찾아 삭제
        User user = userRepository.findUserById(id);
        if (user != null) {
            userRepository.delete(user);
        } else {
            // 사용자를 찾을 수 없는 경우 예외 처리
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }
    }

    public void deleteUser(String id) {
        User optionalUser = userRepository.findUserById(id);

        if (optionalUser==null) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }

        userRepository.delete(optionalUser);
    }

    @Transactional(readOnly = true)
    public User findUserById(String id) {
        Optional<User> byUserId = userRepository.findById(id);

        return byUserId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public User findUserByUserId(Long userId) {
        Optional<User> byUserId = userRepository.findByUserId(userId);

        return byUserId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public User findUserByEmail(String email) {
        Optional<User> byUserId = userRepository.findByEmail(email);

        return byUserId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public void verifyExistsUserId(String id) {
        userRepository.findById(id).ifPresent((e) -> {
            throw new BusinessLogicException(ExceptionCode.ALREADY_EXISTS_ID);
        });
    }

    @Transactional(readOnly = true)
    public void verifyExistsUserEmail(String email) {
        userRepository.findByEmail(email).ifPresent((e) -> {
            throw new BusinessLogicException(ExceptionCode.ALREADY_EXISTS_EMAIL);
        });
    }

    public void saveUser(User user){
        userRepository.save(user);
    }
}
