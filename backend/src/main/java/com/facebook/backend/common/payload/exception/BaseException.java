package com.facebook.backend.common.payload.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BaseException extends RuntimeException {
    private final String message;
    private final String[] args;
}