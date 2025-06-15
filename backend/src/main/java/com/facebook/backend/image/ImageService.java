package com.facebook.backend.image;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * @see ImageServiceImpl
 */
public interface ImageService {
    ImageDto saveImage(MultipartFile file, UUID userId, String description, ImageType type) throws IOException;
    ImageDto findProfileImageByUserId(UUID id);
    ImageDto findCoverImageByUserId(UUID id);
    List<ImageDto> findAlbumImagesByUserId(UUID id);
}