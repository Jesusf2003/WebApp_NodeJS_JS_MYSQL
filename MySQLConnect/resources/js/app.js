var express = require('express');
var mysql = require('mysql');
var app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

/*
    Aquí se establecen los parámetros
    de conexión a la base de datos 'apirest'
*/
var conexion = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   'administrador',
    database:   'apirest'
});

// Pueba de la conexión
conexion.connect(function(error){
    if(error){
        throw error;
    }else {
        console.log('Conexión exitosa');
    }
});

// Envío de datos
app.get('/', function(req,res) {
    res.send('Ruta de inicio');
});

// Listado general de datos
app.get('/api/articulos', (req, res)=> {
    conexion.query('SELECT * FROM articulos',
        (error, filas)=>{
            if(error){
                throw error;
            } else {
                res.send(filas);
            }
    });
});

// Listado individual de datos
app.get('/api/articulos/:id', (req, res)=>{
    conexion.query('SELECT * FROM articulos WHERE id=?',
        [req.params.id],
        (error,fila)=>{
            if (error) {
                throw error;
            } else {
                res.send(fila);
                // Para traer un dato específico
                // res.send(fila[0].descripcion);
            }
    });
});

// Crear o registrar artículo
app.post('/api/articulos', (req,res)=>{
    let data = {
        descripcion:req.body.descripcion,
        precio:req.body.precio,
        stock:req.body.stock
    };
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function (error, results){
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

// Editar o modificar artículo
app.put('/api/articulos/:id', (req,res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [
        descripcion,
        precio,
        stock,
        id
    ], function(error, results){
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});

// Eliminar artículo
app.delete('/api/articulos/:id', (req, res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?',
    [req.params.id],
    function(error, filas){
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

/*
    Aquí se establece el puerto en el que
    se correra la aplicación. (puerto: 7000)
*/
const puerto = process.env.PUERTO;

app.listen(puerto, function () {
    console.log("Servidor funcionando en puerto: "+ puerto);
});