package com.others.KnockKnock.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {
    private final ApiResponseHeader header;
    private final Map<String, T> body;

    public static <T> ApiResponse<T> of(HttpStatus status, String key, T value) {
        Map<String, T> body = new HashMap<>() {{ put(key, value); }};

        return new ApiResponse<>(new ApiResponseHeader(status.value(), status.getReasonPhrase()), body);
    }

    public static <T> ApiResponse<T> ok() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.OK.status, ResponseCode.OK.message), null);
    }

    public static <T> ApiResponse<T> ok(String key, T value) {
        Map<String, T> body = new HashMap<>() {{ put(key, value); }};

        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.OK.status, ResponseCode.OK.message), body);
    }

    public static <T> ApiResponse<T> created() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.CREATED.status, ResponseCode.CREATED.message), null);
    }

    public static <T> ApiResponse<T> created(String key, T value) {
        Map<String, T> body = new HashMap<>() {{ put(key, value); }};

        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.CREATED.status, ResponseCode.CREATED.message), body);
    }

    public static <T> ApiResponse<T> accepted() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.ACCEPTED.status, ResponseCode.ACCEPTED.message), null);
    }

    public static <T> ApiResponse<T> noContent() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.NO_CONTENT.status, ResponseCode.NO_CONTENT.message), null);
    }

    public static <T> ApiResponse<T> badRequest() {
        return new ApiResponse<>(new ApiResponseHeader(ResponseCode.BAD_REQUEST.status, ResponseCode.BAD_REQUEST.message), null);
    }

    enum ResponseCode {
        OK(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase()),
        CREATED(HttpStatus.CREATED.value(), HttpStatus.CREATED.getReasonPhrase()),
        ACCEPTED(HttpStatus.ACCEPTED.value(), HttpStatus.ACCEPTED.getReasonPhrase()),
        NO_CONTENT(HttpStatus.NO_CONTENT.value(), HttpStatus.NO_CONTENT.getReasonPhrase()),
        BAD_REQUEST(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.getReasonPhrase()),
        ;

        @Getter
        private final int status;

        @Getter
        private final String message;

        ResponseCode(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }
}
