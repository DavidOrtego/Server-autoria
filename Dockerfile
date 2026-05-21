FROM node:22-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (solo las de producción si quieres optimizar, pero npm install sirve)
RUN npm install

# Copiar el resto del código del servidor
COPY . .

# Exponer el puerto por el que escucha tu API
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["npm", "start"]
