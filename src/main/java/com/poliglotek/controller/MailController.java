package com.poliglotek.controller;

import com.poliglotek.model.mail.MailResponse;
import com.poliglotek.service.MailService;
import io.micronaut.http.annotation.Controller;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

@Controller("/mail")
@ExecuteOn(TaskExecutors.BLOCKING)
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    public MailResponse sendMail(String senderName, String senderEmail, String messageContent) {
        return mailService.sendMail(senderName, senderEmail, messageContent);
    }
}
