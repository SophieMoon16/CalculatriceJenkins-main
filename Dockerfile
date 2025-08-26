# Dockerfile pour une application nodejs
FROM node:18-alpine AS build
WORKDIR /app
RUN git clone https://github.com/kenaubry/docker-java-app .

# Construction de l'image finale
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# Lancer Spring Boot
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=docker"]