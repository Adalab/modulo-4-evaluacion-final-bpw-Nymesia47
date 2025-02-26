//imports
const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//crear el servidor
const server = express();
require("dotenv").config();

// configurar el servidor
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

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

//funcion the authenticazion
const authToken = (req, res, next) => {
  const tokenString = req.headers.authorization;
  console.log(tokenString);

  if (!tokenString) {
    {res.status(400).json({success:false, message:"Access denied"});}
  } else {
    try {
      const token = tokenString.split(" ")[1];
      const verifyToken = jwt.verify(token, "pepino");
      req.data = verifyToken; 
      console.log(verifyToken);
    } catch (error) {
      res.status(400).json({success: false, message: error});
    }
    next();
  };
};

//Insertar un expense en la tabla expenses

server.post("/expenses", authToken, async (req, res) => {
  try {
    const conn = await getDBconnection();
    const userId = req.data.id;
    const {description, amount, date, category} = req.body;

    let categoryId;
    const sqlCheckCategory = "SELECT id_category FROM categories WHERE category = ?";
    const [existingCategory] = await conn.query(sqlCheckCategory, [category]);

    if (existingCategory.length > 0) {
      categoryId = existingCategory[0].id_category;
    } else {
      const sqlInsertCategory = `INSERT INTO categories (category) VALUES (?)`;
      const [categoryResult] = await conn.query(sqlInsertCategory, [category]);
      categoryId = categoryResult.insertId;
    }

    const sqlInsertExpense = "INSERT INTO expenses (description, amount, date, fk_category, fk_usuario) values (?, ?, ?, ?, ?)";
    const [result] = await conn.query(sqlInsertExpense, [
      description,
      amount,
      date,
      categoryId,
      userId
    ]);
    conn.end();

    if (result.affectedRows > 0) {
      res.status(201).json({
        "success": true,
        "expense_id": result.insertId
      });
    } else {
      console.error("Error inserting expense:", error);
      res.status(500).json({ success: false, error: error.message });
    }
    
  } catch (error) {
    res.status(500).json(error) 
  }
});

//Listar todas las expenses existentes

server.get("/expenses", async(req, res) => {
  try {
    const conn = await getDBconnection();
    const select = `
    SELECT expenses.id_expense, expenses.description, expenses.amount, expenses.date, categories.category
    FROM expenses INNER JOIN categories
    ON expenses.fk_category = categories.id_category
    `;
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
    const selectId = `
    SELECT expenses.id_expense, expenses.description, expenses.amount, expenses.date, categories.category
    FROM expenses INNER JOIN categories
    ON expenses.fk_category = categories.id_category
    WHERE id_expense = ?; `;

    const [result] = await conn.query(selectId, [id]);
    conn.end();

    res.status(200).json(result[0]);

  } catch (error) {
    res.status(500).json(error)
  }
});

//Actualizar una entrada existente.

server.put("/expenses/:id", async(req, res) => {
  try {
    const conn = await getDBconnection();
    const {id} = req.params;
    const {description, amount, date, category} = req.body;

    let categoryId;
    const sqlCheckCategory = "SELECT id_category FROM categories WHERE category = ?";
    const [existingCategory] = await conn.query(sqlCheckCategory, [category]);

    if (existingCategory.length > 0) {
      categoryId = existingCategory[0].id_category;
    } else {
      const sqlInsertCategory = `INSERT INTO categories (category) VALUES (?)`;
      const [categoryResult] = await conn.query(sqlInsertCategory, [category]);
      categoryId = categoryResult.insertId;
    }
  
    
    const updateExpense = "UPDATE expenses SET description = ?, amount = ?, date = ?, fk_category = ? WHERE id_expense = ?";
    
    const [result] = await conn.query(updateExpense, [description, amount, date, categoryId, id]);
    conn.end();
  
    if(result.affectedRows > 0) {
      res.status(200).json({"success": true, message: "Expense updated"});
    }else {
      res.status(400).json(
        {
          success: false,
          message: "No expense found to update"
       });
  
    }
    
  } catch (error) {
    res.status(500).json(error) 
  }

});

//Eliminar una entrada existente.

server.delete("/expenses/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const conn = await getDBconnection();
    const sqlDelete = "DELETE FROM expenses WHERE id_expense = ? ";
    const [result] = await conn.query(sqlDelete, [id]);
    conn.end();
    if(result.affectedRows > 0) {
      res.status(201).json({"success": true,});
    }else {
      res.status(400).json(
        {
          success: false,
          message: "an error occurred on deleting"
       });
  
    }
    
  } catch (error) {
    res.status(500).json(error)   
  }

})

//Bonus

//Registrar usuario

server.post("/register", async (req, res) => {
  try {
    const conn = await getDBconnection();
    const {nombre, email, password} = req.body;
    const selectEmail = "SELECT email FROM usuarios_DB WHERE email = ?";
    const [emailResult] = await conn.query(selectEmail, [email]);

    if(emailResult.length === 0) {
      const passwordHashed =  await bcrypt.hash(password, 10);
    
      const insertUser = "INSERT INTO usuarios_DB (nombre, email, password) values (?, ?, ?)";
      const [result] = await conn.query(insertUser, [nombre, email, passwordHashed]);
      res.status(201).json({success: true, id: result.insertId, token: passwordHashed});
    
    } else {
      res.status(400).json({success: false, message: "User already exists"});
    }
    conn.end();
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
  } 

});

//Login de un usuario

server.post("/login", async(req, res) => {
  try {
    const conn = await getDBconnection();
    const {email, password} = req.body;
    const selectUser = "SELECT * FROM usuarios_DB WHERE email = ?";
    const [userResult] = await conn.query(selectUser, [email]);

    if(userResult.length !== 0) {
      const user = userResult[0];
      const isSamePassword = await bcrypt.compare(password, user.password);

      if(isSamePassword){
        const infoToken = {email: user.email, id: user.id}
        const token = jwt.sign(infoToken, "pepino", {expiresIn: "1h"});
        res.status(201).json({success: true, token});
      } else {
        res.status(400).json({success: false, message: "incorrect password"});
      }
    } else {
      res.status(400).json({success: false, message: "incorrect email"});
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)  
  }
});


//Listar todas las expenses existentes de un usuario
server.get("/exp/user", authToken, async(req, res) => {
  try {
    const conn = await getDBconnection();
    const userId = req.data.id;
    console.log(userId)
    const select = `
    SELECT expenses.id_expense, expenses.description, expenses.amount, expenses.date, categories.category
    FROM expenses INNER JOIN categories
    ON expenses.fk_category = categories.id_category
    WHERE expenses.fk_usuario = ?
    `;
    const [result] = await conn.query(select, [userId]);
    conn.end();
    console.log(result);

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