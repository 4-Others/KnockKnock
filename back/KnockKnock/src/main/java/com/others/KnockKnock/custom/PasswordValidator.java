package com.others.KnockKnock.custom;

import org.springframework.stereotype.Component;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.text.MessageFormat;
/*https://velog.io/@livenow/Java-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%95%A0%EB%85%B8%ED%85%8C%
EC%9D%B4%EC%85%98%EC%9C%BC%EB%A1%9C-Password%EA%B7%9C%EC%B9%99-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0*/
@Component
public class PasswordValidator implements ConstraintValidator<Password, String> {

    private static final int MIN_SIZE = 8;
    private static final String regexPassword = "^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$" + MIN_SIZE + "}$";

    @Override
    public void initialize(Password constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        boolean isValidPassword = password.matches(regexPassword);
        if (!isValidPassword) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                            MessageFormat.format("{0}자 이상,1개 이상의 특수문자를 포함한 비밀번호를 입력해주세요", MIN_SIZE))
                    .addConstraintViolation();
        }
        return isValidPassword;
    }

    public boolean isValid(String password) {
        return password.matches(regexPassword);
    }
}
