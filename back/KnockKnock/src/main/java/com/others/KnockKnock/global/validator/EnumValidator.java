package com.others.KnockKnock.global.validator;


import com.others.KnockKnock.global.annotations.ValidEnum;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EnumValidator implements ConstraintValidator<ValidEnum, String> {
    private ValidEnum annotation;

    @Override
    public void initialize(ValidEnum constraintAnnotation) {
        this.annotation = constraintAnnotation;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        boolean result = false;

        Object[] enumConstants = annotation.enumClass().getEnumConstants();

        if (value != null) {
            for (Object v : enumConstants) {
                if (value.equals(v.toString()) || (this.annotation.ignoreCase() && value.equalsIgnoreCase(v.toString()))) {
                    result = true;
                    break;
                }
            }
        }

        return value == null || result;
    }
}
