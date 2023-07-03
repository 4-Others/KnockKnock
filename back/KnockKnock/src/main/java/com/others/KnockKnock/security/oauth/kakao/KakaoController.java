package com.others.KnockKnock.security.oauth.kakao;

import com.others.KnockKnock.domain.user.dto.BaseResponse;
import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.security.oauth.OAuthService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/oauth")
public class KakaoController {

    @Autowired
    private final OAuthService oAuthService;

    public KakaoController(OAuthService oAuthService){this.oAuthService = oAuthService;}

//    @ResponseBody
//    @GetMapping("/kakao")
//    public ResponseEntity<Map<String, String[]>> kakaoLogIn(@RequestParam("code") String code){
//        try{
//            return new BaseResponse<PostLoginRes>(oAuthService.getKakaoAccessToken(code));
//        }
//        catch (Exception exception){
//            return new BaseResponse<>(exception.getMessage());
//        }
//    }
//    @ResponseBody
//    @GetMapping("/kakao")
//    public String kakaoLogIn(@RequestParam("code")String code) {
//        String access_Token = oAuthService.getAccessToken(code);
//        System.out.println("controller access_token : " + access_Token);
//
//        return access_Token;
//    }
//    @GetMapping("/kakao")
//    public String login(@RequestParam("code") String code, HttpSession session) {
//        String access_Token = oAuthService.getAccessToken(code);
//        HashMap<String, Object> userInfo = oAuthService.getUserInfo(access_Token);
//        System.out.println("login Controller : " + userInfo);
//
//        //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
//        if (userInfo.get("email") != null) {
//            session.setAttribute("userId", userInfo.get("email"));
//            session.setAttribute("access_Token", access_Token);
//        }
//        return "index";
//    }
//    public ResponseEntity<Map<String, String[]>>
    @GetMapping("/kakao")
    public ResponseEntity<HashMap<String, Object>> login(@RequestParam("code") String code, HttpSession session) {
        String access_Token = oAuthService.getAccessToken(code);
        HashMap<String, Object> userInfo = oAuthService.getUserInfo(access_Token);
        System.out.println("login Controller : " + userInfo);

    //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (userInfo.get("email") != null) {
            session.setAttribute("userId", userInfo.get("email"));
            session.setAttribute("access_Token", access_Token);
        }
//        return ResponseEntity.ok(response);
        return ResponseEntity.ok(userInfo);
}

}

