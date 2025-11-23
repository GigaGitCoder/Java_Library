FROM eclipse-temurin:21-jre-jammy

# Для Ubuntu используется apt-get, а не apk
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    bash \
    curl \
    wget \
    netcat \
    iputils-ping \
    dnsutils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY target/book-service.jar /app/app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

