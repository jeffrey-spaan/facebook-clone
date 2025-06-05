package com.facebook.backend.security.user;

import java.util.UUID;

public record UserDto(
        UUID id,
        String username,
        String email,
        String role
) {
}