package com.facebook.backend.security.auth;

import com.facebook.backend.common.constant.Constant;
import com.facebook.backend.security.role.RoleService;
import com.facebook.backend.security.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
record AuthMapperService(
        PasswordEncoder passwordEncoder,
        RoleService roleService
) {

    public User mapCreateDtoToEntity(AuthRegisterDto authRegisterDto) {
        User user = new User();
        user.setFirstName(authRegisterDto.getFirstName());
        user.setLastName(authRegisterDto.getLastName());
        user.setDateOfBirth(authRegisterDto.getDateOfBirth());
        user.setGender(authRegisterDto.getGender());
        user.setUsername(authRegisterDto.getUsername());
        user.setEmail(authRegisterDto.getEmail());
        user.setRole(roleService.findRoleByName(Constant.Security.Role.ROLE_DEFAULT));
        user.setPassword(passwordEncoder.encode(authRegisterDto.getPassword()));
        user.setEnabled(true);
        return user;
    }
}