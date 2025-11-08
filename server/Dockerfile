FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias: usa npm ci si existe package-lock.json, si no hace npm install
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev; \
    else \
      npm install --omit=dev; \
    fi

# Copiar el resto del código
COPY . .

# Usar usuario no-root
RUN chown -R node:node /app
USER node

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Comando por defecto (usa el script "start" de package.json)
CMD ["npm", "start"]
