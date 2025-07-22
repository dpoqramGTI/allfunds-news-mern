FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json y tsconfig para cachear dependencias
COPY package*.json tsconfig.json ./
RUN npm install

# Copiar el código
COPY . .

# Construir (TypeScript compila usando tsconfig con paths `@/`)
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Instalar solo dependencias de producción
RUN npm install --omit=dev

EXPOSE 9000

CMD ["node", "dist/src/server.js"]
