FROM registry.fedoraproject.org/fedora-minimal:41

# Update and install dependencies
RUN microdnf update -y && \
    microdnf install -y wget tar ca-certificates

# Install Eclipse Temurin JDK 21
RUN wget -q -O /tmp/temurin.tar.gz  \
    "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jre_x64_linux_hotspot_21.0.2_13.tar.gz" \
    && mkdir -p /usr/local/temurin21 \
    && tar -xzf /tmp/temurin.tar.gz -C /usr/local/temurin21 --strip-components=1 \
    && rm -f /tmp/temurin.tar.gz \
    && microdnf remove wget -y \
    && microdnf clean all

# Rest of your Dockerfile remains the same
ENV JAVA_HOME=/usr/local/temurin21
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /home/app

COPY build/docker/main/layers/app /home/app/
COPY build/docker/main/layers/libs /home/app/libs
COPY build/docker/main/layers/resources /home/app/resources

EXPOSE 8080

CMD ["java", "-jar", "/home/app/application.jar"]