
# Create user account

> npm run command -- addUser -fn *< first name >* -ln *< last name >* -e *< email >* -a *< password >* -p *< password >* -ia *< true >*

# Dockers Commands

### construir imagen
* docker build -t coder39740:1.0 .

### Listar imagen
* docker images

### Mostrar los procesos (contenedores) quese estan ejecutando
* docker ps -a

### crear contenedor y correrlo en el puerto 8080 con el nombre de node_coder
* docker run -p 8081:8080 --name node_coder -d coder39740:1.0

### Eliminar contenedor
* docker rm "name" (node_coder)

### Logs
* docker logs -f node_coder

# Docker-Compose 

### Levantar contenedores
* docker-compose up

### Parar contenedores
* docker-compose stop

### Remover contenedores
* docker-compose down
