package com.poliglotek.controller;

import com.poliglotek.model.contactform.ContactFormData;
import com.poliglotek.model.contactform.ContactResponse;
import com.poliglotek.service.ContactService;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

@Controller("/mail")
@ExecuteOn(TaskExecutors.BLOCKING)
public class ContactController {

    private final ContactService mailService;

    public ContactController(ContactService mailService) {
        this.mailService = mailService;
    }

    @Post()
    public ContactResponse sendMail(@Body ContactFormData contactFormData) {
        return mailService.sendMail(contactFormData);
    }
}
