# Usar imagen oficial de Node
FROM node:20-alpine

# Carpeta de trabajo
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Ejecutar Vite accesible desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host"]