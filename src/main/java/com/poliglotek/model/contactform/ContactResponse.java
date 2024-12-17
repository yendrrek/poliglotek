package com.poliglotek.model.contactform;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Introspected
@Serdeable.Serializable
@Data
public class ContactResponse {

    private boolean success;
}
