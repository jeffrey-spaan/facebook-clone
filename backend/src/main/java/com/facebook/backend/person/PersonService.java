package com.facebook.backend.person;

import java.util.UUID;

/**
 * @see PersonServiceImpl
 */
public interface PersonService {
    Person findById(UUID id);
}