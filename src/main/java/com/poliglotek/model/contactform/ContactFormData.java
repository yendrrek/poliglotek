package com.poliglotek.model.contactform;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Introspected
@Serdeable.Deserializable
@Data
public class ContactFormData {

    private String senderName;
    private String senderEmail;
    private String message;
}
