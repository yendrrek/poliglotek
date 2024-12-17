package com.poliglotek.service;

import com.mailgun.model.message.Message;
import com.poliglotek.model.contactform.ContactFormData;
import com.poliglotek.model.contactform.ContactResponse;
import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;

@Singleton
public class ContactService {

    private final String emailTo;
    private final String subjectStaticPart;

    public ContactService(@Value("${mailgun.politlotekEmailTo}") String emailTo,
                          @Value("${mailgun.subjectStaticPart}") String subject) {
        this.emailTo = emailTo;
        this.subjectStaticPart = subject;
    }

    public ContactResponse sendMail(ContactFormData contactFormData) {
        String fullSubject = subjectStaticPart + " " + contactFormData.getSenderName();
        Message message = Message.builder()
                .from(contactFormData.getSenderEmail())
                .to(emailTo)
                .subject(fullSubject)
                .text(contactFormData.getMessage())
                .build();
        return null; // todo: will actually return data later
    }
}
