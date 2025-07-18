package com.facebook.backend.person;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface PersonRepository extends JpaRepository<Person, UUID> {
}