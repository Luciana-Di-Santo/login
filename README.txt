INSTRUCCIONES

1) Instalar Node.js:
https://nodejs.org

2) Abrir terminal en la carpeta del proyecto

3) Instalar dependencias:

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
corepack enable
pnpm init
npm install -g pnpm
pnpm install
pnpm install express mysql2 cors bcrypt
pnpm approve-builds

4) Crear base de datos:
Importar el archivo database.sql en HeidiSQL

5) Ejecutar servidor:

pnpm start

6) Abrir navegador:

http://localhost:3000
