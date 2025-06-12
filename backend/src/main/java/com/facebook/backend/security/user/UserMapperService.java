package com.facebook.backend.security.user;

import com.facebook.backend.person.PersonMapperService;
import com.facebook.backend.security.role.RoleService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
record UserMapperService(
        PasswordEncoder passwordEncoder,
        PersonMapperService personMapperService,
        RoleService roleService
) {

    public UserDto mapToDto(User user) {
        return new UserDto(
                user.getId(),
                personMapperService.mapToDto(user.getPerson()),
                user.getUsername(),
                user.getEmail(),
                user.getRole().getName()
            );
    }

    public User mapCreateDtoToEntity(UserCreateDto userCreateDto) {
        User user = new User();
        user.setPerson(personMapperService.mapCreateDtoToEntity(userCreateDto.person()));
        user.setUsername(userCreateDto.username());
        user.setEmail(userCreateDto.email());
        user.setPassword(passwordEncoder.encode(userCreateDto.password()));
        user.setRole(roleService.findRoleByName(userCreateDto.role()));
        return user;
    }

    public User mapUpdateDtoToEntity(User user, UserUpdateDto userUpdateDto) {
        user.setPerson(personMapperService.mapUpdateDtoToEntity(user.getPerson(), userUpdateDto.person()));
        user.setUsername(userUpdateDto.username());
        user.setEmail(userUpdateDto.email());
        user.setPassword(passwordEncoder.encode(userUpdateDto.password()));
        user.setRole(roleService.findRoleByName(userUpdateDto.role()));
        return user;
    }

    public Map<String, Long> mapUsersByRole(List<User> users) {
        return users.stream()
                .collect(Collectors.groupingBy(
                        user -> user.getRole().getName(),
                        Collectors.counting()
                ));
    }
}