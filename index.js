const express = require('express');
const { readFile } = require('fs');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    multipleStatements: true
});

db.connect((err)=>{
    if(err)console.log(err);  
});


app.get('/', (req, res) => {
    readFile('./index.html','utf-8', (err, html) => {
        if (err) res.status(500).send('server error');
        res.send(html);
    });
    //console.log(req.query);
});

app.get('/db', (req, res) => {
    const database = req.query.db;
    console.log(database);
    if(!database)
    {
        db.query('SHOW DATABASES', (err, result) => {
            if(err) console.log(err);
            else res.send(result);
        });
    }
    else 
    {
        db.query(`USE ${database}; SHOW TABLES;`, (err, result) => {
            if(err) console.log(err);
            else res.send(result[1]);
        });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));