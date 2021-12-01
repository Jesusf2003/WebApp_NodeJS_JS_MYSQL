# WebApp_NodeJS_JS_MYSQL

## Instalar y conectar MySQL con Node.js

### Instalar Node.js

1. Abre tu navegador de preferencia (Chrome, Opera, MicrosoftEdge, etc)
2. Escribir Nodejs en el buscador
3. Buscar la página [oficial](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjkto6E2cH0AhXfIrkGHQ_fByYQFnoECBYQAQ&url=https%3A%2F%2Fnodejs.org%2Fes%2F&usg=AOvVaw0ExrfV3usJ0jiF4UKHq0z3).
4. Ir a la sección de descargas
5. Descargar, de preferencia, la última versión de Node.js
6. Seguir el proceso de instalación

### Instalar Mysql

Recomiendo ver el siguiente [enlace](https://www.youtube.com/watch?v=Sv2vBT3dtvQ) si
trabajas con MySQL community, en caso de trabajar con XAMP, puedes salteartelo.

### Instalar librería de conexión

1. Abrir el Símbolo de Sistema o CMD
	- Hacer click en el ícono de Windows ubicado
	  en la parte inferior izquierda de la ventana
	- Escribir CMD
	- Hacer click en la aplicación Símbolo de sistema
2. Escribir el siguiente código *npm install mysql*
3. Posteriormente, escribir el siguiente código *npm install mysqljs/mysql*

### Crear base de datos

1. Ingresar a la conexión
2. Ejecutar la siguiente sentencia:
    
    *alter user 'root'@'localhost' identified with mysql_native_password by 'contraseña que ingreses';*

2. Ejecutar el código: *CREATE DATABASE 'nombre de la base de datos';*
3. Poner en uso la base de datos creada
4. Crear las tablas en base al script adjunto en la siguiente ruta:

    MySQLConnect/resources/sql/ApiRest.sql

### Crear cadena de conexión

1. Crear una carpeta donde se realizará el proyecto.
2. Abrir Visual Studio Code
3. Desplazar la carpeta a Visual Studio Cod
4. Abrir un nuevo terminal:
    * Terminal -> new Terminal
    * Recomendable usar el terminal cmd
4. Creación del proyecto: *npm init -y*
5. Crear las carpetas del proyecto:
    - index.html
    - resources:
        * js
            - app.js
        * css
             - style.css
6. Guiarse del archivo app.js para la conexión a la base de datos
7. Correr la aplicación en js:
    - En el terminal ingresar: ruta/*node 'archivo js creado'* (Sin la extenión .js)

### Instalar Postman

1. Abre tu navegador de preferencia (Chrome, Opera, MicrosoftEdge, etc)
2. Escribir Postman en el buscador
3. Buscar la página [oficial](https://www.postman.com/downloads/).
4. Ir a la sección de descargas
5. Hacer click en el sistema operativo que estés utilizando
6. Abrir el instalador descargado
7. Seguir el procedimiento de instalación

- Si pide que ingreses una cuenta, prueba registrate con tu cuenta de gmail
- Recomiendo ver los siguientes [videos](https://www.youtube.com/watch?v=3xNm-m3SVNk&list=PLrAw40DbN0l2dg--IB6xTsEQTD1Qb1aBa&index=2) en caso de perderse.

### Comandos importantes
- Setear el puerto en la ruta/js: *set PUERTO='Número del puerto a correr'*
- Cancelar o cerrar procedimiento: ctrl + C en el terminal.