FROM eclipse-temurin:21-jre-alpine

RUN apk add --no-cache bash

RUN addgroup -S spring && adduser -S spring -G spring

WORKDIR /app

COPY target/library-1.0.jar library-1.0.jar

RUN mkdir -p /var/logs && chown -R spring:spring /var/logs /app

USER spring:spring

EXPOSE 8091

ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-XX:InitialRAMPercentage=50.0", \
    "-XX:+ExitOnOutOfMemoryError", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", \
    "library-1.0.jar"]