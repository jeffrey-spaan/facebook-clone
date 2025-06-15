package com.facebook.backend.image;

import java.util.UUID;

public record ImageDto(
        UUID id,
        UUID userId,
        String name,
        String description,
        byte[] data,
        String contentType
) {
}