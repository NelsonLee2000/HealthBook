// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");
// const bcrypt = require("bcrypt");

// // middleware
// app.use(cors());
// app.use(express.json());

// //home page

// app.get("/", async(req, res) => {
//     res.json("Hello There")
// })

// //ROUTES FOR "USER"

// //create a user with a hashed password
// app.post("/user", async(req, res) => {
//     try {
//         const { email, firstname, lastname } = req.body;
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         const newUser = await pool.query(
//             "INSERT INTO \"user\" (email, password, firstname, lastname) VALUES($1, $2, $3, $4)", 
//             [email, hashedPassword, firstname, lastname]
//         );
        
//         res.json(newUser);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// //update user information
// app.put("/user/:id", async(req, res) => {
//     try {
//         const { firstname, lastname } = req.body;
//         const { id } = req.params;
        
//         const updateUser = await pool.query(
//             "UPDATE \"user\" SET firstname=$1, lastname =$2 WHERE user_id = $3",
//             [firstname, lastname, id]
//         );

//         res.json("User information updated successfully!");
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// //delete user information
// app.delete("/user/:id", async(req, res) => {
//     try {
//         const { id } = req.params;

//         const deleteUser = await pool.query(
//             "DELETE FROM \"user\" WHERE user_id = $1",
//             [id]
//         );

//         res.json("User has been deleted successfully!");
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.listen(3000, () => {
//     console.log("server has started on port 3000");
// });

const src = require('./src')