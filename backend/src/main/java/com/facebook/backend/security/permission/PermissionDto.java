package com.facebook.backend.security.permission;

import lombok.Builder;

import java.util.UUID;

@Builder
public record PermissionDto(
        UUID id,
        String name
) {
}