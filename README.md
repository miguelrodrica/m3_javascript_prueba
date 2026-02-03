# Prueba final de desarrollo Módulo 3 - Javascript

## Coder
- Miguel Angel Rodriguez Cano
- Clan: McCarthy

## Que es y hace este proyecto
Aplicacion web sencilla con:
- Sistema de autenticación simulado.
- Manejo de roles (user/admin).
- Consumo de API falsa con JSON Server.
- Gestión de tareas.
- Panel administrativo con métricas (faltó).
- Persistencia de sesión.
- Separación clara entre vistas según rol.
- CRUD: Crear, listar, editar y eliminar.
- Diseño frontend usando Bootstrap.

## Como instalarlo
1. Abrir la terminal de Linux.
2. Ubicar en la carpeta deseada. Ejemplo: "cd Documentos/".
3. Clonar el repositorio: "git clone https://github.com/miguelrodrica/m3_javascript_prueba.git".
4. Confirmar la descarga de los archivos: "git pull".
5. Abrir el repositorio con Visual Studio Code: "code .".

## Como correrlo
0. Asegurarse de tener instalada la extensión de Visual Studio Code llamada Live Server.
1. Instalar dependencias: "npm install json-server".
2. Iniciar JSON Server: "npx json-server db.json".
3. Abrir el login.html en el navegador usando Live Server.

## Estructura del proyecto
```
m3_javascript_prueba/
├── html/
│   ├── admin.html
│   ├── login.html
│   ├── signup.html
│   └── user.html
├── js/
│   ├── admin.js
│   ├── login.js
│   ├── logout.js
│   ├── roleValidateAdmin.js
│   ├── roleValidateUser.js
│   ├── signup.js
│   └── user.js
├── README.md
├── index.html
└── db.json
