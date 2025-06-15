package com.facebook.backend.image;

import com.facebook.backend.common.constant.Constant;
import com.facebook.backend.security.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = Constant.Table.IMAGES)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String name; // optional

    private String description;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] data;

    private String contentType; // e.g. image/jpeg

    @Column(nullable = false)
    private ImageType type;
}