package com.facebook.backend.person;

import com.facebook.backend.common.constant.Constant;
import com.facebook.backend.common.constant.ValidationConstant;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = Constant.Table.PERSONS)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = ValidationConstant.Person.NAME_MAX_CHAR)
    private String firstName;

    @Column(nullable = false, length = ValidationConstant.Person.NAME_MAX_CHAR)
    private String lastName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false, length = 1)
    private Character gender;
}