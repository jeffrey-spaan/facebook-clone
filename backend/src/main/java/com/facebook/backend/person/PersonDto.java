package com.facebook.backend.person;

import java.time.LocalDate;
import java.util.UUID;

public record PersonDto(
        UUID id,
        String firstName,
        String lastName,
        LocalDate dateOfBirth,
        Character gender
) {
}