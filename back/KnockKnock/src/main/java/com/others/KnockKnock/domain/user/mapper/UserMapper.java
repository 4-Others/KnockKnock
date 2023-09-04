package com.others.KnockKnock.domain.user.mapper;

import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserDto.Response toResponseDto(User user);
    User userDtoSignupToUser(UserDto.Signup requestBody);
    @Mappings({
            @Mapping(target = "password", source = "newPassword")
    })
    User userDtoPasswordToUser(UserDto.PasswordUpdate requestBody);
}
