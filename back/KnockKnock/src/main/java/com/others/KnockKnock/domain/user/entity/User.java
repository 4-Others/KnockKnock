package com.others.KnockKnock.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.others.KnockKnock.security.oauth.entity.ProviderType;
import com.others.KnockKnock.security.oauth.entity.RoleType;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Table(name = "USERS")
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User{
    @Id
    @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "ID", length = 64, unique = true)
    @Size(max = 64)
    private String id;

    @Column(name = "USERNAME", length = 100)
    @Size(max = 100)
    private String username;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "PASSWORD", length = 128)
    @NotNull
    @Size(max = 128)
    private String password;

    @Column(name = "BIRTH")
    @DateTimeFormat(pattern = "yyyyMMdd")
    private LocalDate birth;

    @Column(name = "PUSH_AGREE")
    private Boolean pushAgree;

    @Column(name = "EMAIL_VERIFIED_YN", length = 1)
    @NotNull
    @Size(min = 1, max = 1)
    private String emailVerifiedYn;

    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Column(name = "CREATED_AT")
    @NotNull
    private LocalDateTime createdAt;

    @Column(name = "MODIFIED_AT")
    @NotNull
    private LocalDateTime modifiedAt;


    public User(
             Long userId,
             @Size(max = 64) String id,
             @Size(max = 512) String email,
             @Size(max = 1) String emailVerifiedYn,
             LocalDate birth,
             Boolean pushAgree,
             ProviderType providerType,
             RoleType roleType,
             LocalDateTime createdAt,
             LocalDateTime modifiedAt
    ) {
        this.userId = userId;
        this.id = id;
        this.password = "NO_PASS";
        this.email = email != null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.birth = birth;
        this.pushAgree = pushAgree;
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

}