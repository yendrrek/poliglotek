package com.poliglotek.controller;

import com.poliglotek.model.loginrequest.LoginRequest;
import com.poliglotek.model.loginresponse.LoginResponse;
import com.poliglotek.service.AuthService;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller("/api/auth")
public class AuthController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Post("/login")
    @Secured(SecurityRule.IS_ANONYMOUS)
    public HttpResponse<LoginResponse> login(@Body LoginRequest request) {
        return authService.validateLoginProcess(request);
    }

    @Post("/logout")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public HttpResponse<?> logout(HttpRequest<?> request, Authentication authentication) {
        LOG.info("User logged out: {}", authentication.getName());
        return HttpResponse.noContent();
    }
}
