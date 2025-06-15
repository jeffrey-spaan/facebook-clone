package com.facebook.backend.person;

import com.facebook.backend.common.payload.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    @Override
    public Person findById(UUID id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("person.not.found.by.id", new String[]{id.toString()}));
    }
}