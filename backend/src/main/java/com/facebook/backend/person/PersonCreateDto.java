package com.facebook.backend.person;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDate;

import static com.facebook.backend.common.constant.ValidationConstant.Person.*;

@Builder
public record PersonCreateDto(
        @NotBlank(message = NAME_NOT_BLANK_ERROR)
        @Size(min = NAME_MIN_CHAR, max = NAME_MAX_CHAR, message = NAME_SIZE_ERROR)
        @Pattern(regexp = NAME_PATTERN, message = NAME_PATTERN_ERROR)
        String firstName,

        @NotBlank(message = NAME_NOT_BLANK_ERROR)
        @Size(min = NAME_MIN_CHAR, max = NAME_MAX_CHAR, message = NAME_SIZE_ERROR)
        @Pattern(regexp = NAME_PATTERN, message = NAME_PATTERN_ERROR)
        String lastName,

        @Past(message = DOB_PAST_ERROR)
        LocalDate dateOfBirth,

        Character gender
) {
}