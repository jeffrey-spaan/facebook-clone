package com.facebook.backend.image;

import com.facebook.backend.security.user.User;
import com.facebook.backend.security.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageMapperService {

    private final UserService userService;

    public ImageDto mapToDto(Image image) {
        return new ImageDto(
                image.getId(),
                image.getUser().getId(),
                image.getName(),
                image.getDescription(),
                image.getData(),
                image.getContentType()
        );
    }

    public List<ImageDto> mapToDtoList(List<Image> images) {
        return images.stream()
                .map(this::mapToDto)
                .toList();
    }

    public Image mapCreateDtoToEntity(MultipartFile file, UUID userId, String description, ImageType type) throws IOException {
        User user = userService.findById(userId);

        Image image = new Image();
        image.setUser(user);
        image.setName(file.getOriginalFilename());
        image.setDescription(description);
        image.setData(file.getBytes());
        image.setContentType(file.getContentType());
        image.setType(type);

        return image;
    }
}