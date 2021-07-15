const express = require('express');
//create a web app
const app = express();
require('dotenv').config();
const mysql = require('mysql');
let todo = [];
let itemcount=0;

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.DATABASE,
    database:"projects"
});

con.connect(function(err)
{
    if(err) throw err;
    console.log("Connected");
});

app.listen(3002);
app.use(express.static('public'));


app.get('/', function () {
    let printtodos = "";
    for (let i = 0; i < todo.length; i++) {
        printtodos += `<input type="checkbox" id=${todo[i]} name=${todo[i]}
        <label for=${todo[i]}>` + todo[i] + `</label><br>`
    }
});
app.get('/change', (req, res) => {
    todo.push(req.query.todoname);
    itemcount++;
    res.redirect('/');

});
app.get('/deletetodo', (req, res) => {
    let key = (Object.keys(req.query));
    itemcount-=key.length;
    for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < todo.length; j++) {
            if (key[i] == todo[j]) {
                todo.splice(j, 1);
            }
        }
    }
    res.redirect('/');
})