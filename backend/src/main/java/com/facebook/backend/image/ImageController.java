package com.facebook.backend.image;

import com.facebook.backend.common.constant.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(Constant.Request.IMAGES)
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<ImageDto> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") UUID userId,
            @RequestParam("description") String description,
            @RequestParam("type") String type
    ) throws IOException {
        return new ResponseEntity<>(
                imageService.saveImage(
                        file,
                        userId,
                        description,
                        ImageType.valueOf(type)
                ),
                HttpStatus.OK
        );
    }

    @GetMapping("/profile-image")
    public ResponseEntity<ImageDto> getProfileImageById(
            @RequestParam("userId") UUID userId
    ) {
        return new ResponseEntity<>(
                imageService.findProfileImageByUserId(userId),
                HttpStatus.OK
        );
    }

    @GetMapping("/cover-image")
    public ResponseEntity<ImageDto> getCoverImageById(
            @RequestParam("userId") UUID userId
    ) {
        return new ResponseEntity<>(
                imageService.findCoverImageByUserId(userId),
                HttpStatus.OK
        );
    }

    @GetMapping("/album-images")
    public ResponseEntity<List<ImageDto>> getAlbumImagesById(
            @RequestParam("userId") UUID userId
    ) {
        return new ResponseEntity<>(
                imageService.findAlbumImagesByUserId(userId),
                HttpStatus.OK
        );
    }
}