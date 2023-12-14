# Prueba Técnica FrontEnd - Sintad

Sistema realizado en Angular CLI version 16.2.7

## Pasos previos
- Realizar en `npm install` para la instalación de las librerías necesarias.
- Se necesita el sistema [Back-End](https://github.com/Enzoest26/prueba-tecnica-backend-sintad) levantado para el uso correcto del Front-End.
- Inicializar con el comando de `ng serve` para el despliegue, opcional agregar el argumento `-o` para abrirlo en una pestaña automaticamente.

## Sistema
Para el logueao al sistema usar el usuario de `ADMIN` y contraseña `ADMIN_ADMIN`. El sistema se inicia con la siguiente ruta: `http://localhost:4200/`

## Caracteristicas
Se uso los siguientes modulos para el desarrollo del Front
- Interceptadores : Utilizado para manejar las peticiones por HTTP, en este caso se agrego el token en los request como Headers y el manejo de errores por parte del servidor.
- Guards: Utilizado para la proteción de rutas, en este caso se uso para restringir el acceso a los mantenimientos sin el tener un token.

## Librerías
Para el desarrollo se uso las siguientes librerías:
- Bootstrap
