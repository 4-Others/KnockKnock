package com.others.KnockKnock.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {
    public final static DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static String convertLocalDateTimeToFormatString(LocalDateTime time) {
        return time.format(format);
    }

    public static String convertLocalDateTimeToFormatString(LocalDateTime time, String pattern) {
        DateTimeFormatter format = DateTimeFormatter.ofPattern(pattern);

        return time.format(format);
    }

    public static LocalDateTime parseStringToLocalDateTime(String time) {
        return LocalDateTime.parse(time, format);
    }
}
