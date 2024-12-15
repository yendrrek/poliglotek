package com.poliglotek.model.mail;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Introspected
@Serdeable.Serializable
@Data
public class MailResponse {

    private boolean success;
}
