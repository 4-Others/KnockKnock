package com.others.KnockKnock.domain.home.controller;


import com.others.KnockKnock.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class HomeController {
    @GetMapping
    public ResponseEntity<?> getHome() {
        String home = "this is home";
        return ResponseEntity.ok().body(ApiResponse.success("성공", home));
    }
}
