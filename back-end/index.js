require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


const rds_host = process.env.RDS_HOST
const rds_user = process.env.RDS_USER
const rds_password = process.env.RDS_PASSWORD

const db = mysql.createConnection({
    host: rds_host,
    user: rds_user,
    password: rds_password,
    database: "election66",
    port: "3306"
})

db.connect((err) => {
    if (err) {
        console.log('Error connecting to RDS =', err)
        return;
    }
    else {
        console.log('RDS successfully connected');
    }
})


/* Example how to query database
app.get("/province", (req, res) => {
    const q = "SELECT * FROM province;"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json(data)
    })
})
*/


app.listen(8800, ()=>{
    console.log("Server is running on port 8800")
})
