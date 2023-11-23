# API'S MOVILIDAD PUEBLA

Backend creado en su totalidad con EXPRESS JS para uso de SQLSERVER.

## Carpetas
    
- __Controllers:__  Contiene las funciones que se necesitara para cada entidad de la base de datos.

- __Database:__ Contiene las funciones necesarias para la conexión a la base de datos y los estatus de respuesta a las peticiones.

- __Routes:__ En esta carpet se crean clases donde se creara cada ruta de las apis para los controladores.

## Archivos esenciales

- __app.js:__ Este archivo configura la aplicación Express con ciertos middleware, configura el puerto y utiliza rutas específicas relacionadas con los cada ruta de los controladores.

- __index.js:__ En este archivo instanciamos a app y configuramos el puerto por donde la aplicacion estara echuchando.

- __config.js:__ En este archivo importamos las variables de entorno que necesarias.

- __.babelrc:__ Archivo de configración de babel para la correcta integracion de las dependencias y plugins.

## Antes de ejecutar

Tienes que crear en la raiz del proyecto un archivo .env con la siguiente estructura.

    PORT = 3001

    USER = ''
    PASSWORD = ''
    SERVER = ''
    DATABASE = ''

## Comandos a ejecutar

Primero debemos de instalar las dependencias necesarias con:

    $ npm install

Si queremos ejecutar en modo desarrollo ejecutaremos el siguente comando:

    $ npm run dev

Para ejecutar en produccion:

    $ npm run build
    $ npm run start
    