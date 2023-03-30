
const redis = require("redis");

require("dotenv").config()

const client = redis.createClient({
    url:process.env.redisUrl
})


client.on("error",(err)=>console.log("error while connecting to redis server",err))
client.on("connect",()=>console.log("connected to redis server"))

client.connect()

module.exports={client}
