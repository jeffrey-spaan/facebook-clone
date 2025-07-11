package com.facebook.backend.security.auth;

import com.facebook.backend.common.http.HttpRequestService;
import com.facebook.backend.common.payload.exception.InvalidAuthenticationException;
import com.facebook.backend.security.jwt.JwtService;
import com.facebook.backend.security.token.TokenService;
import com.facebook.backend.security.token.TokenType;
import com.facebook.backend.security.user.User;
import com.facebook.backend.security.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthFactory authFactory;
    private final HttpRequestService httpRequestService;
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final AuthMapperService authMapperService;
    private final UserService userService;

    /**
     * Authenticates a user based on the provided authentication request details.
     *
     * @param authLoginDto the authentication dto containing the email/username and password
     * @return an authentication response containing the JWT and the refresh token
     * @throws InvalidAuthenticationException if the provided email and password are invalid
     */
    @Override
    public AuthDto login(AuthLoginDto authLoginDto) {
        final String emailOrUsername = authLoginDto.getEmailOrUsername();
        User user = userService.findByEmailOrUsername(emailOrUsername);

        if (!user.isEnabled()) {
            user.setEnabled(true);
            userService.setUserEnabled(user, true);
        }

        this.authenticateByUsernameAndPassword(user.getEmail(), authLoginDto.getPassword());
        tokenService.invalidateAllTokensByUserId(user.getId());
        String accessToken = jwtService.createJwt(user, TokenType.ACCESS);
        String refreshToken = jwtService.createJwt(user, TokenType.REFRESH);

        return authFactory.createAuthResponse(
                user, "auth.login.success", accessToken, refreshToken);
    }

    /**
     * Registers a new user based on the provided registration request details.
     *
     * @param authRegisterDto the auth creation dto containing the user's email, username and password
     * @return an authentication response containing the access token and the refresh token
     */
    @Override
    @Transactional
    public AuthDto register(AuthRegisterDto authRegisterDto) {
        User user = authMapperService.mapCreateDtoToEntity(authRegisterDto);
        User savedUser = userService.saveUser(user);
        String accessToken = jwtService.createJwt(user, TokenType.ACCESS);
        String refreshToken = jwtService.createJwt(user, TokenType.REFRESH);

        return authFactory.createAuthResponse(
                savedUser, "auth.register.success", accessToken, refreshToken);
    }

    /**
     * Authenticates a user based on the provided email and password via the
     * Authentication Manager provided by Spring Security.
     *
     * @param email    the email of the user to authenticate
     * @param password the password of the user to authenticate
     * @throws InvalidAuthenticationException if the provided email and password are invalid
     */
    private void authenticateByUsernameAndPassword(String email, String password) {
        try {
            Authentication authenticationRequest =
                    UsernamePasswordAuthenticationToken.unauthenticated(email, password);
            Authentication authentication = authenticationManager.authenticate(authenticationRequest);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AuthenticationException ex) {
            throw new InvalidAuthenticationException("auth.invalid.credentials", new String[]{email});
        }
    }

    /**
     * Validates the provided JWT and refresh token.
     * If valid, it generates a new access token and returns the authentication response.
     *
     * @return an authentication response containing the new access token and the already existing refresh token
     * @throws InvalidAuthenticationException if the provided JWT and refresh token are invalid
     */
    @Override
    public AuthDto refresh() {
        String accessToken = httpRequestService.extractAccessTokenFromAuthorizationHeader();
        String refreshToken = httpRequestService.extractRefreshTokenFromCookie();

        if (accessToken == null || refreshToken == null
                || !jwtService.isJwtValid(refreshToken, TokenType.REFRESH)) {
            throw new InvalidAuthenticationException("auth.invalid.credentials", new String[]{null});
        }

        String email = jwtService.extractEmailFromJwt(refreshToken, TokenType.REFRESH);
        User user = userService.findByEmail(email);
        tokenService.invalidateToken(
                jwtService.extractIdFromJwt(accessToken, TokenType.ACCESS),
                TokenType.ACCESS
        );
        accessToken = jwtService.createJwt(user, TokenType.ACCESS);

        return authFactory.createAuthResponse(
                user, "auth.refresh.success", accessToken, refreshToken);
    }
}