package com.facebook.backend.security.permission;

import com.facebook.backend.security.role.RoleCreateDto;

import java.util.List;

public record PermissionCreateDto(
        String name,
        List<RoleCreateDto> roles
) {
}