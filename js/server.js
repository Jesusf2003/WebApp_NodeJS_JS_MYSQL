// Importando librerías
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var app = express();

// Usar librerías
app.use(express.json());
app.use(cors());

var connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "administrador",
    database: "clientdb"
  }
);

// Probando conexión
connection.connect(function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Conexión exitosa");
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Servidor funcionando en "+ port);
});

// Main path
app.get("/", function(req, res) {
  res.send("Ruta inicial");
});

// GET all clients
app.get("/api/clients", (req, res) => {
	connection.query("SELECT * FROM client", function(err, row, fields) {
		if (err) {
			throw err;
		} else {
			console.log(row);
			res.send(row);
		}
	});
});

// GET client by id
// app.get("/api/clients/id/:id", (req, res) => {
// 	connection.query("SELECT * FROM client WHERE IDCLI=?", [req.params.id], (err, rows, fields) => {
// 		if (err) {
// 			throw err;
// 		} else {
// 			console.log(rows);
// 			req.send(rows);
// 		}
// 	})
// });

// Post new client
app.post("/api/clients", (req, res) => {
	const data = {
		namecli: req.body.NAMECLI,
		lnamecli: req.body.LNAMECLI,
		cellcli: req.body.CELLCLI
	};
	let sql = "INSERT INTO client SET ? ";
	connection.query(sql, data, function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(data);
			res.send(data);
		}
	});
});

app.post("/api/clients/id/:id", (req, res) => {
	const data = {
		namecli: req.body.NAMECLI,
		lnamecli: req.body.LNAMECLI,
		cellcli: req.body.CELLCLI
	};

	let sql = "UPDATE client SET ? WHERE idcli = ? ";
	connection.query(sql, [data, req.params.id], function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(data);
			res.send(data);
		}
	});
});

app.delete("/api/clients/id/:id", (req, res) => {
	var id = req.params.id;
	let sql = "DELETE FROM client WHERE idcli=? ";
	connection.query(sql, [id], function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(id);
			res.send(id);
		}
	})
});
