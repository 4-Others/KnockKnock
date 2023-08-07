package com.others.KnockKnock.security;

import com.others.KnockKnock.security.jwt.JwtAuthenticationEntryPoint;
import com.others.KnockKnock.security.jwt.JwtAuthenticationFilter;
import com.others.KnockKnock.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/h2/**");
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 인증이 필요한 경로와 예외를 설정합니다.
        http.authorizeRequests()
                .antMatchers("/api/v1/users/signup").permitAll()
                .antMatchers("/api/v1/users/login").permitAll()
                .antMatchers("/api/v1/emails/**").permitAll()
                .antMatchers("/api/v1/users/kakao").permitAll()
                .antMatchers("/auth/**").permitAll()
                .anyRequest().authenticated() // 다른 요청은 인증이 필요하도록 설정
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint) // 인증 예외 처리를 위한 커스텀 AuthenticationEntryPoint 설정
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않기 위해 세션 관리 방식을 STATELESS로 설정
                .and()
                .csrf().disable();

        http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, userDetailsService), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().antMatchers("/h2/**");
    }

}