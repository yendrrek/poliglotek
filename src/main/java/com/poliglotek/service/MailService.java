package com.poliglotek.service;

import com.mailgun.model.message.Message;
import com.poliglotek.model.mail.MailResponse;
import io.micronaut.context.annotation.Value;

public class MailService {

    private final String emailTo;
    private final String subjectStaticPart;

    public MailService(@Value("${mailgun.politlotekEmailTo}") String emailTo,
                       @Value("${mailgun.subjectStaticPart}") String subject) {
        this.emailTo = emailTo;
        this.subjectStaticPart = subject;
    }

    public MailResponse sendMail(String senderName, String senderEmail, String messageContent) {
        String fullSubject = subjectStaticPart + " - " + senderName;
        Message message = Message.builder()
                .from(senderEmail)
                .to(emailTo)
                .subject(fullSubject)
                .text(messageContent)
                .build();
    }
}
