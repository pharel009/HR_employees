const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = mysql2.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "employee_system"
});


//post new user
app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES(?, ?, ?, ?, ?)",
     [name, age, country, position, wage],(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted")
        }
     })

});


//get all users
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})




app.listen(3001,() => {
    console.log('Server is running on port 3001');
});

