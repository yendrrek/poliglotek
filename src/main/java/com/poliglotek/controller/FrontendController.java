package com.poliglotek.controller;

import io.micronaut.core.io.ResourceResolver;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.types.files.StreamedFile;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

import java.util.Optional;

@Controller()
@Secured(SecurityRule.IS_ANONYMOUS) // TODO: Although functionality from UI only if user logged in
public class FrontendController {

    private final ResourceResolver resourceResolver;
    private static final String CLASS_PATH = "classpath:public/browser/index.html";
    private static final String BROWSER_SETTINGS = "no-cache, no-store, must-revalidate";

    public FrontendController(ResourceResolver resourceResolver) {
        this.resourceResolver = resourceResolver;
    }

    @Get(value = "/{path:[^.]*}")
    @Produces(MediaType.TEXT_HTML)
    public HttpResponse<StreamedFile> serveFrontend(String path) {
        Optional<StreamedFile> optionalIndexFile = resourceResolver.getResource(CLASS_PATH)
                .map(StreamedFile::new);
        return optionalIndexFile
                .map(file -> HttpResponse.ok(file).header(HttpHeaders.CACHE_CONTROL, BROWSER_SETTINGS))
                .orElse(null);
    }
}
