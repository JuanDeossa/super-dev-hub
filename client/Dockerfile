# ...existing code...
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación (Vite genera /dist)
RUN npm run build

# Production stage usando "serve" vía npx
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar el build estático
COPY --from=builder /app/dist ./dist

# Ajustar permisos y usar usuario no-root
RUN chown -R node:node /app
USER node

ENV NODE_ENV=production
ENV PORT=5173

EXPOSE 5173

# Ejecutar el paquete "serve" con npx para servir la carpeta dist en el puerto 5173
CMD ["npx", "serve", "-s", "/app/dist", "-l", "5173"]