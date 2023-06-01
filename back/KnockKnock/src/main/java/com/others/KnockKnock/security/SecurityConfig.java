package com.others.KnockKnock.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 인증이 필요한 경로와 예외를 설정합니다.
        http.authorizeRequests()
                .antMatchers("/signup").permitAll() // 회원가입 엔드포인트는 인증 없이 접근 가능하도록 설정
                .anyRequest().authenticated() // 다른 요청은 인증이 필요하도록 설정
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint) // 인증 예외 처리를 위한 커스텀 AuthenticationEntryPoint 설정
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않기 위해 세션 관리 방식을 STATELESS로 설정
                .and()
                .csrf().disable(); // CSRF 보안 비활성화 (테스트 환경에서는 일반적으로 비활성화)

        // JWT 인증 필터를 추가합니다.
        http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, userDetailsService), UsernamePasswordAuthenticationFilter.class);
    }
}


