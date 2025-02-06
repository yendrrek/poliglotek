FROM registry.fedoraproject.org/fedora-minimal:41

RUN microdnf update -y && \
    microdnf install -y wget tar ca-certificates chromium-headless && \
    wget -q -O /tmp/temurin.tar.gz \
    "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jre_x64_linux_hotspot_21.0.2_13.tar.gz" && \
    mkdir -p /usr/local/temurin21 && \
    tar -xzf /tmp/temurin.tar.gz -C /usr/local/temurin21 --strip-components=1 && \
    microdnf remove wget -y && \
    microdnf clean all && \
    rm -rf /var/cache/dnf /tmp/* /var/tmp/*

ENV JAVA_HOME=/usr/local/temurin21
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /home/app

COPY build/docker/main/layers/app /home/app/
COPY build/docker/main/layers/libs /home/app/libs
COPY build/docker/main/layers/resources /home/app/resources

EXPOSE 8080

CMD ["java", "-jar", "/home/app/application.jar"]