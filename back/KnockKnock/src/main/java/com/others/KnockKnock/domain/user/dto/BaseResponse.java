package com.others.KnockKnock.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse<T> {
    private boolean isSuccess;
    private int code;
    private String message;
    private T result;

    // 생성자, 게터/세터 생략

    public BaseResponse(T result) {
        this.isSuccess = true;
        this.code = 1000;
        this.message = "요청에 성공하였습니다.";
        this.result = result;
    }
}
