package com.facebook.backend.security.auth;

/**
 * @since 0.0.1
 * @see AuthServiceImpl
 */
interface AuthService {
    AuthDto login(AuthLoginDto loginDto);
    AuthDto register(AuthRegisterDto authRegisterDto);
    AuthDto refresh();
}