# Imagen base ligera
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar cache
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar el resto del código
COPY . .

# Usar usuario no-root
RUN chown -R node:node /app
USER node

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Puerto expuesto (ajustar si tu app usa otro)
EXPOSE 8080

# Comando por defecto (usa el script "start" de package.json)
CMD ["npm", "start"]