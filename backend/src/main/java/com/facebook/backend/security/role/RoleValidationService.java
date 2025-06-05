package com.facebook.backend.security.role;

import com.facebook.backend.common.payload.exception.ResourceAlreadyExistsException;
import org.springframework.stereotype.Service;

@Service
record RoleValidationService(RoleRepository roleRepository) {

    public void validateRoleNameUniqueness(String roleName) {
        if (roleRepository.existsByName(roleName)) {
            throw new ResourceAlreadyExistsException(
                    "role.val.name.must.be.unique",
                    new String[]{roleName}
            );
        }
    }
}