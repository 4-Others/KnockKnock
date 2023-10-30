package com.others.KnockKnock.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {

    private final static int SUCCESS = 200;
    private final static int NOT_FOUND = 400;
    private final static int FAILED = 500;
    private final static int UNAUTHORIZED = 401;
    private final static int PASSWORD_WRONG = 401;
    private final static int WRONG_USERID = 402;
    private final static String SUCCESS_MESSAGE = "SUCCESS";
    private final static String NOT_FOUND_MESSAGE = "NOT FOUND";
    private final static String FAILED_MESSAGE = "서버에서 오류가 발생하였습니다.";
    private final static String INVALID_ACCESS_TOKEN = "Invalid access token.";
    private final static String INVALID_REFRESH_TOKEN = "Invalid refresh token.";
    private final static String NOT_EXPIRED_TOKEN_YET = "Not expired token yet.";
    private final static String NOT_AUTHORIZED = "UnAuthorize error!";
    private final static String PASSWORD_IS_WRONG = "패스워드가 일치하지 않습니다";
    private final static String USERID_IS_WRONG = "입력하신 유저아이디가 일치하지않습니다";

    private final ApiResponseHeader header;
    private final Map<String, T> body;

    public static <T> ApiResponse<T> success(String name, T body) {
        Map<String, T> map = new HashMap<>();
        map.put(name, body);

        return new ApiResponse(new ApiResponseHeader(SUCCESS, SUCCESS_MESSAGE), map);
    }

    public static <T> ApiResponse<T> fail() {
        return new ApiResponse(new ApiResponseHeader(FAILED, FAILED_MESSAGE), null);
    }

    public static <T> ApiResponse<T> invalidAccessToken() {
        return new ApiResponse(new ApiResponseHeader(FAILED, INVALID_ACCESS_TOKEN), null);
    }

    public static <T> ApiResponse<T> invalidRefreshToken() {
        return new ApiResponse(new ApiResponseHeader(FAILED, INVALID_REFRESH_TOKEN), null);
    }

    public static <T> ApiResponse<T> notExpiredTokenYet() {
        return new ApiResponse(new ApiResponseHeader(FAILED, NOT_EXPIRED_TOKEN_YET), null);
    }
    public static <T> ApiResponse<T> unAuthorized(){
        return new ApiResponse(new ApiResponseHeader(UNAUTHORIZED,NOT_AUTHORIZED),null);
    }
    public static <T> ApiResponse<T> passwordWrong(){
        return new ApiResponse(new ApiResponseHeader(PASSWORD_WRONG,PASSWORD_IS_WRONG),null);
    }
    public static <T> ApiResponse<T> userIdWrong(){
        return new ApiResponse<>(new ApiResponseHeader(WRONG_USERID,USERID_IS_WRONG), null);
    }

}

