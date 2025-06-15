package com.facebook.backend.image;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    Image findByUserIdAndType(UUID userId, ImageType imageType);
    List<Image> findAllByUserIdAndType(UUID userId, ImageType imageType);
}