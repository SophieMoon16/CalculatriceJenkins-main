FROM selenium/standalone-chrome:latest

USER root
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le repertoire de travail
WORKDIR /app
# Copier les fichiers vers le repertoire de travail
COPY index.html .
COPY script.js .
COPY style.css .
COPY test_calculatrice.js .
COPY package.json .
# Installer selenium-webdriver + http-server
RUN npm install -g http-server selenium-webdriver

# Exposer le port 
EXPOSE 8081
# Démarrer le serveur statique + attendre + lancer les tests
CMD sh -c "http-server -p 8081 ./ & sleep 5 && node test_calculatrice.js http://localhost:8081"