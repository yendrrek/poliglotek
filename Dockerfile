FROM registry.fedoraproject.org/fedora-minimal:41

# Update and install minimal dependencies all at once to reduce layers
RUN microdnf update -y && \
    microdnf install -y wget tar ca-certificates && \
    # Install Eclipse Temurin JDK 21
    wget -q -O /tmp/temurin.tar.gz \
    "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jre_x64_linux_hotspot_21.0.2_13.tar.gz" && \
    mkdir -p /usr/local/temurin21 && \
    tar -xzf /tmp/temurin.tar.gz -C /usr/local/temurin21 --strip-components=1 && \
    # Install Google Chrome
    wget -q https://dl.google.com/linux/linux_signing_key.pub -O /tmp/google.pub && \
    rpm --import /tmp/google.pub && \
    echo -e "[google-chrome]\nname=google-chrome\nbaseurl=https://dl.google.com/linux/chrome/rpm/stable/x86_64\nenabled=1\ngpgcheck=1\ngpgkey=https://dl.google.com/linux/linux_signing_key.pub" > /etc/yum.repos.d/google-chrome.repo && \
    microdnf install -y google-chrome-stable && \
    # Cleanup
    microdnf remove wget -y && \
    microdnf clean all && \
    rm -rf /var/cache/dnf /tmp/* /var/tmp/* && \
    # Remove unnecessary Chrome files
    rm -rf /opt/google/chrome/chrome_100_percent.pak \
           /opt/google/chrome/chrome_200_percent.pak \
           /opt/google/chrome/default_apps \
           /opt/google/chrome/locales \
           /opt/google/chrome/MEIPreload \
           /opt/google/chrome/nacl_helper \
           /opt/google/chrome/xdg-mime

ENV JAVA_HOME=/usr/local/temurin21
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /home/app

COPY build/docker/main/layers/app /home/app/
COPY build/docker/main/layers/libs /home/app/libs
COPY build/docker/main/layers/resources /home/app/resources

EXPOSE 8080

CMD ["java", "-jar", "/home/app/application.jar"]