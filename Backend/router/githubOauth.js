const express = require("express")
const oauth = express.Router()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//Github Oauth
oauth.get("/github", async (req, res) => {
    try {
        const { code } = req.query
        let accessToken = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.github_client_id,
                client_secret: process.env.github_client_sct,
                code
            })
        }).then((res) => res.json())

        // console.log(accessToken.access_token)
        const userDetail = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken.access_token}`
            }
        }).then((res) => res.json())

     // res.sendFile(path.join(__dirname ,"../frontend/index.html"));
     res.send({"msg":"login successful"})
    } catch (error) {
        res.send({ "error": error.message })
    }
})

module.exports={oauth}