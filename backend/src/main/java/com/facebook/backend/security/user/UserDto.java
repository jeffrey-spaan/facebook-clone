package com.facebook.backend.security.user;

import com.facebook.backend.person.PersonDto;

import java.util.UUID;

public record UserDto(
        UUID id,
        PersonDto person,
        String username,
        String email,
        String role
) {
}