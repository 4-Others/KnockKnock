package com.others.KnockKnock.security.oauth.kakao;

import com.others.KnockKnock.security.oauth.service.OAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

@RestController
@RequestMapping("/oauth")
public class KakaoController {

    @Autowired
    private final OAuthService oAuthService;

    public KakaoController(OAuthService oAuthService){this.oAuthService = oAuthService;}

    @GetMapping("/kakao")
    public ResponseEntity<HashMap<String, Object>> login(@RequestParam("code") String code, HttpSession session) {
        String access_Token = oAuthService.getKakaoAccessToken(code);
        HashMap<String, Object> userInfo = oAuthService.getKakaoUserInfo(access_Token);
        System.out.println("login Controller : " + userInfo);

    //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("access_Token", access_Token);
        }
        return ResponseEntity.ok(userInfo);
    }

}

