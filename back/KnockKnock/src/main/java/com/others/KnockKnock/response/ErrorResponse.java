package com.others.KnockKnock.response;

import com.others.KnockKnock.exception.ExceptionCode;
import com.others.KnockKnock.utils.GsonUtil;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")));
    private final int status;
    private final String message;
    private final List<FieldError> errors;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.errors = new ArrayList<>();
    }

    private ErrorResponse(final ExceptionCode code) {
        this.status = code.getStatus();
        this.message = code.getMessage();
        this.errors = new ArrayList<>();
    }

    private ErrorResponse(final ExceptionCode code, final List<FieldError> errors) {
        this.status = code.getStatus();
        this.message = code.getMessage();
        this.errors = errors;
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(final ExceptionCode code) {
        return new ErrorResponse(code);
    }

    public static ErrorResponse of(MethodArgumentTypeMismatchException e) {
        final String name = e.getName();
        final String value = e.getValue() != null ? e.getValue().toString() : "";
        final List<FieldError> errors = FieldError.of(name, value, e.getMessage());

        return new ErrorResponse(ExceptionCode.INVALID_TYPE_VALUE, errors);
    }

    public static ErrorResponse of(MissingServletRequestParameterException e) {
        final String name = e.getParameterName();
        final String type = e.getParameterType();
        final List<FieldError> errors = FieldError.of(name, type, e.getMessage());

        return new ErrorResponse(ExceptionCode.INVALID_TYPE_VALUE, errors);
    }

    public static ErrorResponse of(MissingPathVariableException e) {
        final String name = e.getVariableName();
        final List<FieldError> errors = FieldError.of(name, "", e.getMessage());

        return new ErrorResponse(ExceptionCode.INVALID_TYPE_VALUE, errors);
    }

    public static ErrorResponse of(final ExceptionCode code, final BindingResult bindingResult) {
        return new ErrorResponse(code, FieldError.of(bindingResult));
    }

    public static void sendErrorResponse(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(exceptionCode);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(exceptionCode.getStatus());
        response.getWriter().write(Objects.requireNonNull(GsonUtil.toJson(errorResponse, ErrorResponse.class)));
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class FieldError {
        private String field;
        private String value;
        private String reason;

        private FieldError(final String field, final String value, final String reason) {
            this.field = field;
            this.value = value;
            this.reason = reason;
        }

        public static List<FieldError> of(final String field, final String value, final String reason) {
            List<FieldError> fieldErrors = new ArrayList<>();
            fieldErrors.add(new FieldError(field, value, reason));

            return fieldErrors;
        }

        private static List<FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();

            return fieldErrors.stream()
                       .map(error -> new FieldError(
                           error.getField(),
                           error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
                           error.getDefaultMessage()))
                       .collect(Collectors.toList());
        }
    }
}
