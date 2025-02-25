//imports
const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");

//crear el servidor
const server = express();
require("dotenv").config();

// configurar el servidor
server.use(cors());
server.use(express.json());

//funcion para conectarse a la BD
async function getDBconnection() {
  const connection = await mysql.createConnection({
    host:"localhost",
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: "expense_tracker"
  });
  await connection.connect();
  return connection;
}

const PORT = 5005;
server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

/*
Defina las rutas para las siguientes operaciones y escriba los endpoints correspondientes:
1.- Insertar una entrada en su entidad principal.
2.- Leer/Listar todas las entradas existentes.
3.- Actualizar una entrada existente.
4.- Eliminar una entrada existente.
*/

//Endpoints

//Insertar un expense en la tabla expenses

server.post("/expenses", async (requestAnimationFrame, res) => {
  try {
    const conn = await getDBconnection();
    const {description, amount, date} = requestAnimationFrame.body;
    const sqlInsert = "INSERT INTO expenses (description, amount, date) values (?, ?, ?)";
    const [result] = await conn.query(sqlInsert, [
      description,
      amount,
      date
    ]);

    if (result) {
      res.status(201).json({
        "success": true,
        "expense_id": result.insertId
      });
    } else {
      res.status(400).json({
        "success": false,
        "expense_id": "Failed to insert"
      });
    }
    
  } catch (error) {
    res.status(500).json(error) 
  }
});

//Listar todas las expenses existentes

server.get("/expenses", async(req, res) => {
  try {
    const conn = await getDBconnection();
    const select = "SELECT * FROM expenses";
    const [result] = await conn.query(select);
    conn.end();

    res.status(200).json(
      {
        info: {count: result.length},
        result: result
      }
    )
    
  } catch (error) {
    res.status(500).json(error)  
  }
});

//Obtener un expense por su ID

server.get("/expenses/:id", async(req, res)=>{
  try{
    const conn = await getDBconnection();
    const {id} = req.params;
    const selectId = "SELECT * FROM expenses WHERE id_expense = ? ";

    const [result] = await conn.query(selectId, [id]);
    conn.end();

    res.status(200).json(result[0]);

  } catch (error) {
    res.status(500).json(error)
  }
});

//Actualizar una entrada existente.

server.put("/expenses/:id", async(req, res) => {
  const {id} = req.params;
  const {description, amount, date} = req.body;

  const conn = await getDBconnection();
  const updateExpense = "UPDATE expenses SET description = ?, amount = ?, date = ? WHERE id_expense = ?";
  
  const [result] = await conn.query(updateExpense, [description, amount, date, id]);

  if(result.affectedRows > 0) {
    res.status(201).json({"success": true,});
  }else {
    res.status(400).json(
      {
        success: false,
        message: "An error occurred"
     });

  }
});