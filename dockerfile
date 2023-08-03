# Utiliza la imagen oficial de Node.js que incluye npm
FROM node:18-alpine
#Despues creemaos una carpeta interna donde vamos a guardae nuestro proyecto
WORKDIR /app

#Con est, copiamos el packege.json de nuestra carpeta actual, a la carpeta dockeroperations
COPY package.json package-lock.json ./

#Una vez copiado, ejecutamos npm -i interno en esa carpeta. Reinstalamos dependencias en el contenedor de docker
RUN npm install -g nodemon

#Despues procedemos a tomar todo el codigo del aplicativo
COPY . .

#Por ultimo, ejecutamos el comando para correr el aplicativo npm start
CMD ["npm", "start"]