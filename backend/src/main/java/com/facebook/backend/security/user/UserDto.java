package com.facebook.backend.security.user;

import java.time.LocalDate;
import java.util.UUID;

public record UserDto(
        UUID id,
        String firstName,
        String lastName,
        LocalDate dateOfBirth,
        Character gender,
        String username,
        String email,
        String role
) {
}