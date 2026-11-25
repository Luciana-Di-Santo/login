const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

/* import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'; */

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2468",
    database: "login_db"
});

conexion.connect((err)=>{

    if(err){
        console.log("Error conexión:", err);
    }else{
        console.log("MySQL conectado");
    }

});

// =======================
// REGISTRO
// =======================

app.post("/register", async(req, res)=>{

    const { username, password } = req.body;

    if(!username || !password){
        return res.json({
            success:false,
            mensaje:"Complete todos los campos"
        });
    }

    try{

        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios(usuario, password)
            VALUES (?, ?)
        `;

        conexion.query(sql, [username, passwordHash], (err, result)=>{

            if(err){

                if(err.code === "ER_DUP_ENTRY"){
                    return res.json({
                        success:false,
                        mensaje:"El usuario ya existe"
                    });
                }

                return res.json({
                    success:false,
                    mensaje:"Error al registrar"
                });
            }

            res.json({
                success:true,
                mensaje:"Usuario registrado"
            });

        });

    }catch(error){

        res.json({
            success:false,
            mensaje:"Error servidor"
        });

    }

});

// =======================
// LOGIN
// =======================

app.post("/login", (req, res)=>{

    const { username, password } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE usuario = ?
    `;

    conexion.query(sql, [username], async(err, result)=>{

        if(err){

            return res.json({
                success:false,
                mensaje:"Error servidor"
            });

        }

        if(result.length === 0){

            return res.json({
                success:false,
                mensaje:"Usuario no encontrado"
            });

        }

        const usuario = result[0];

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if(passwordCorrecta){

            res.json({
                success:true,
                mensaje:"Login correcto"
            });

        }else{

            res.json({
                success:false,
                mensaje:"Contraseña incorrecta"
            });

        }

    });

});

app.listen(3000, ()=>{

    console.log("Servidor corriendo en puerto 3000");

});

// =======================
// OBTENER PRODUCTOS
// =======================

app.get("/productos", (req,res)=>{
    const sql = "SELECT * FROM productos";
    conexion.query(sql, (err,result)=>{
        if(err){
            return res.json({
                success:false
            });
        }
        res.json(result);
    });
});

// =======================
// CREAR PRODUCTO
// =======================
app.post("/productos", (req,res)=>{
    const {
        nombre,
        categoria,
        precio,
        stock,
        descripcion
    } = req.body;
    const sql = `
        INSERT INTO productos
        (nombre,categoria,precio,stock,descripcion)
        VALUES (?,?,?,?,?)
    `;
    conexion.query(sql,
    [
        nombre,
        categoria,
        precio,
        stock,
        descripcion
    ],
    (err,result)=>{
        if(err){
            return res.json({
                success:false
            });
        }
        res.json({
            success:true
        });
    });
});

// =======================
// ELIMINAR PRODUCTO
// =======================
app.delete("/productos/:id", (req,res)=>{
    const id = req.params.id;
    const sql = `
        DELETE FROM productos
        WHERE id = ?
    `;
    conexion.query(sql,[id],(err,result)=>{
        if(err){
            return res.json({
                success:false
            });  
        }
        res.json({
            success:true
        });
    });
});

// =======================
// EDITAR PRODUCTO
// =======================
app.put("/productos/:id", (req,res)=>{
    const id = req.params.id;
    const {
        nombre,
        categoria,
        precio,
        stock,
        descripcion
    } = req.body;
    const sql = `
        UPDATE productos
        SET
        nombre=?,
        categoria=?,
        precio=?,
        stock=?,
        descripcion=?
        WHERE id=?
    `;
    conexion.query(sql,
    [
        nombre,
        categoria,
        precio,
        stock,
        descripcion,
        id
    ],
    (err,result)=>{

        if(err){

            return res.json({
                success:false
            });
        }
        res.json({
            success:true
        });
    });
});
