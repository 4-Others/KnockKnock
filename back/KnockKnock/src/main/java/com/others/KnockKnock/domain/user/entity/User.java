package com.others.KnockKnock.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.others.KnockKnock.domain.user.status.Status;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "USERS")
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(length = 100)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = true)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;
    @Column(nullable = false)
    private boolean pushAgree;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    private boolean emailVerified;
    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    @Column(name = "last_logged_in")
    private LocalDateTime lastLoggedIn; // 휴면계정 전환 기준 : 1년

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<UserStatusHistory> statusHistory;
    @Builder
    public User(String email,String password){
        this.email = email;
        this.password = password;
        this.statusHistory = new ArrayList<>();
    }
    public void addStatusHistory(Status status, LocalDateTime timestamp) {
        UserStatusHistory history = new UserStatusHistory(this, status, timestamp);
        statusHistory.add(history);
    }
}
