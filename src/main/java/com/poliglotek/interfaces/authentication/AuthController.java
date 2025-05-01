package com.poliglotek.interfaces.authentication;

import com.poliglotek.application.authentication.AuthApplicationService;
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
    private final AuthApplicationService authApplicationService;

    public AuthController(AuthApplicationService authService) {
        this.authApplicationService = authService;
    }

    @Post("/login")
    @Secured(SecurityRule.IS_ANONYMOUS)
    public HttpResponse<LoginResponse> login(@Body LoginRequest request) {
        LoginResponse response = authApplicationService.login(request);
        return HttpResponse.ok(response);
    }

    @Post("/logout")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    public HttpResponse<?> logout(HttpRequest<?> request, Authentication authentication) {
        LOG.info("User logged out: {}", authentication.getAttributes().get("email"));
        return HttpResponse.noContent();
    }
}
