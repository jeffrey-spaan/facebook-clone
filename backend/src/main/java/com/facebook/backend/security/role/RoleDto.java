package com.facebook.backend.security.role;

import com.facebook.backend.security.permission.PermissionDto;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record RoleDto(
        UUID id,
        String name,
        List<PermissionDto> permissions
) {
}