FROM selenium/standalone-chrome:latest

USER root

# Installer Node.js
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Répertoire de travail
WORKDIR /app

# Copier les fichiers
COPY index.html .
COPY script.js .
COPY style.css .
COPY test_calculatrice.js .
COPY package*.json ./

# Installer dépendances locales (http-server + selenium-webdriver)
RUN npm install http-server selenium-webdriver

# Exposer le port
EXPOSE 8081

# Lancer http-server puis les tests
CMD sh -c "npx http-server -p 8081 ./ & sleep 5 && node test_calculatrice.js http://localhost:8081"