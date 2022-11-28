const express = require('express');
const { readFile } = require('fs');
const mysql = require('mysql');

const app = express();
app.use(express.static('./'));
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
    const table = req.query.tb;
    console.log(database);
    if(!database)
    {
        sqlQuerySend('SHOW DATABASES', res)
    }
    else if(database && !table)
    {
        sqlQuerySend(`SHOW TABLES FROM ${database}`, res);
    }
    else
    {
        sqlQuerySend(`SHOW COLUMNS FROM ${database}.${table}`, res);
    }
    // localhost:3000/db?db=databaseName&tb=tableName
});

const sqlQuerySend = (quer, res) => {
    db.query(quer, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
};


app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));