var express = require("express");
var mysql = require("mysql");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "administrador",
  database: "dbRestaurante",
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conexión exitosa");
  }
});

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function () {
  console.log("Servidor funcionando en puerto: " + puerto);
});

app.get("/api/pedido", (req, res) => {
    let sql = "SELECT * FROM pedido";
    conexion.query(
      sql, (error, results) => {
        if (error) {
          throw error;
        } else {
          console.log(results);
          res.send(results);
        }
      }
    );
  }
);

app.post(
  "/api/pedido", (req, res) => {
    let data = {
      userped: req.body.USERPED,
      emausped: req.body.EMAUSPED,
      celusped: req.body.CELUSPED,
      foodped: req.body.FOODPED,
      msgped: req.body.MSGPED,
    };
    let sql = "INSERT INTO pedido SET ?";
    conexion.query(
      sql, data, function (error, results) {
        if (error) {
          throw error;
        } else {
          console.log(data);
          res.send(data);
        }
      }
    );
  }
);

app.put(
  "/api/pedido/:id", (req, res) => {
    var id = req.params.id;
    let data = {
      userped: req.body.USERPED,
      emausped: req.body.EMAUSPED,
      celusped: req.body.CELUSPED,
      foodped: req.body.FOODPED,
      msgped: req.body.MSGPED,
    };
    let sql = "UPDATE pedido SET ? WHERE IDPED="+id;
    conexion.query(
      sql, data, function(error, resultado) {
        if (error) {
          throw error;
        } else {
          console.log(data);
          res.send(data);
        }
      }
    );
  }
);

app.delete(
  "/api/pedido/:id", (req, res) => {
    var id = req.params.id;
    let sql = "DELETE FROM pedido WHERE IDPED="+id;
    conexion.query(
      sql, function(error, resultado) {
        if (error) {
          throw error;
        } else {
          res.json(
            {
              ok: true,
              msg: "Pedido eliminado"
            }
          );
        }
      }
    );
  }
);