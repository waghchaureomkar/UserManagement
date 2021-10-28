const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');

const app = express();
const port = process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MySql connection
const mysql = require("mysql");
var db = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "" ,
  database: "usersdb",
});  

//------routs------------

//login user
app.post("/login",(req,res) => {
    const emailid = req.body.emailid;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE emailid = ? AND password = ? ",[emailid,password],(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result[0])
        }
    });
})


//show all users
app.get("/users",(req,res) => {

    db.query("SELECT * FROM users",(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    });
})

// view user
app.get("/user/:id",(req,res) => {
    const id = req.params.id;
    db.query("SELECT * FROM users WHERE ID = ?",[id],(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result[0])
        }
    });
})

// add new user into database
app.post("/user",(req,res) => {
    const username = req.body.username;
    const emailid = req.body.emailid;
    const password = req.body.password;

    if(username && emailid && password){

        db.query("SELECT * FROM users WHERE emailid = ?",[emailid],(err,result) => {
            if (result[0]){
                const msg = "Email ID already exist"
                res.send({msg})
            } else {
                db.query("INSERT INTO users (username,emailid,password) VALUES (?,?,?)",
                    [username,emailid,password],(err,result) => {
                    if (err){
                        console.log(err)
                    } else {
                        const added = `user: ${username} inserted succesfully`;
                        res.send({added})
                    }
                });
            }
        });

    } else{
        const msg = "enter all the details correctly"
        res.send({msg})

    }

   
})

// update user info
app.put("/user/:id",(req,res) => {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const UpdateQue = "UPDATE users SET username = ?, password = ? WHERE id = ?;"

    if(username && password){
        db.query(UpdateQue,[username,password,id],(err,result) => {
            if (err){
                console.log(err)
            } else {
                const edited = `User: ${username} updates succesfull`;
                res.send({edited})
            }
        });
    }else{
        const msg = `input field not be empty`;
        res.send({msg})

    }
})


// delete user from database
app.delete("/:id",(req,res) => {
    const id = req.params.id;
    const UpdateQue = "DELETE FROM users WHERE id = ?;"

    db.query(UpdateQue,[id],(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(`user delete succesfull`)
        }
    });
})

// listen port
app.listen(port, () => console.log(`server is running on port: ${port}`));
