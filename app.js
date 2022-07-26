const express = require("express");
require("dotenv").config();

const db = require("./models");

const app = express();
app.use(express.json());

const dbConnector = ()=>{
    db.sequelize.authenticate().then(()=>{
      console.log("mysql connected");
    }).catch(err=>{
      console.log("Error connecting to db: ", err);
    }) 
}

dbConnector();

app.use("/api", require("./routes"));

app.use((err, req, res, next)=>{
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
})

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`listening to port ${port}`)
})