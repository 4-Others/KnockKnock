package com.others.KnockKnock.domain.user.entity;

import com.others.KnockKnock.domain.user.status.Status;
import lombok.*;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(nullable = false, length = 100)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    private boolean emailVerified;
    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }
    @Column(name = "last_logged_in")
    private LocalDateTime lastLoggedIn; // 휴면계정 전환 기준 : 1년
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserStatusHistory> statusHistory;

    public void addStatusHistory(Status status, LocalDateTime timestamp) {
        UserStatusHistory history = new UserStatusHistory(this, status, timestamp);
        statusHistory.add(history);
    }

}
