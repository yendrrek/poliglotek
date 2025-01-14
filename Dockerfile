## This is the JDK used
FROM eclipse-temurin:21-jre

# Working directory of the application inside the contaier
WORKDIR /home/app

# Copy all the parts of the applciation into the container
COPY build/docker/main/layers/app /home/app/
COPY build/docker/main/layers/libs /home/app/libs
COPY build/docker/main/layers/resources /home/app/resources

# Install Google Chrome and dependencies
# After installation, cached, obsolete data is removed with `rm` (saves 5MB).
# https://stackoverflow.com/a/71008100/12208549
RUN apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update  \
    && apt-get -y install google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt/* \
    && rm -rf /tmp/*

# Port used
EXPOSE 8080

# Execute the application
ENTRYPOINT ["java", "-jar", "/home/app/application.jar"]
