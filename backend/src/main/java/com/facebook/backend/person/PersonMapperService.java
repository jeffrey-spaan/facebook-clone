package com.facebook.backend.person;

import org.springframework.stereotype.Service;

@Service
public record PersonMapperService() {

    public PersonDto mapToDto(Person person) {
        return new PersonDto(
                person.getId(),
                person.getFirstName(),
                person.getLastName(),
                person.getDateOfBirth(),
                person.getGender()
        );
    }

    public Person mapCreateDtoToEntity(PersonCreateDto personCreateDto) {
        Person person = new Person();
        person.setFirstName(personCreateDto.firstName());
        person.setLastName(personCreateDto.lastName());
        person.setDateOfBirth(personCreateDto.dateOfBirth());
        person.setGender(personCreateDto.gender());
        return person;
    }

    public Person mapUpdateDtoToEntity(Person person, PersonUpdateDto personUpdateDto) {
        person.setFirstName(personUpdateDto.firstName());
        person.setLastName(personUpdateDto.lastName());
        person.setDateOfBirth(personUpdateDto.dateOfBirth());
        person.setGender(personUpdateDto.gender());
        return person;
    }
}