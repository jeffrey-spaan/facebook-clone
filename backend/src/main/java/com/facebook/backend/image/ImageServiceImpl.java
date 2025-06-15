package com.facebook.backend.image;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
class ImageServiceImpl implements ImageService {

    private final ImageMapperService imageMapperService;
    private final ImageRepository imageRepository;

    @Override
    public ImageDto saveImage(
            MultipartFile file,
            UUID userId,
            String description,
            ImageType imageType
    ) throws IOException {
        Image image = imageMapperService.mapCreateDtoToEntity(file, userId, description, imageType);
        imageRepository.save(image);
        return imageMapperService.mapToDto(image);
    }

    @Override
    @Transactional(readOnly = true)
    public ImageDto findProfileImageByUserId(UUID userId) {
        return imageMapperService.mapToDto(
                imageRepository.findByUserIdAndType(userId, ImageType.PROFILE)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ImageDto findCoverImageByUserId(UUID userId) {
        return imageMapperService.mapToDto(
                imageRepository.findByUserIdAndType(userId, ImageType.COVER)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<ImageDto> findAlbumImagesByUserId(UUID userId) {
        return imageMapperService.mapToDtoList(
                imageRepository.findAllByUserIdAndType(userId, ImageType.ALBUM)
        );
    }
}