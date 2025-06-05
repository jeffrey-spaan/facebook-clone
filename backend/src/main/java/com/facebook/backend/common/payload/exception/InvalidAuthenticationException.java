package com.facebook.backend.common.payload.exception;

public class InvalidAuthenticationException extends BaseException {
    public InvalidAuthenticationException(String message, String[] args) {
        super(message, args);
    }
}