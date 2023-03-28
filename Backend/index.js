const express = require("express")
const {connection} = require("./configs/db")

require("dotenv").config()
const app = express()




app.listen(process.env.port,async () => {
    try{
        await connection
        console.log("connected to DB");
    }
    catch(err){
        console.log('Something went wrong');
        console.log(err.messsage);
    }
    console.log(`App is running at port ${process.env.port}`);
})