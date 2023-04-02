const express = require("express")
const { connection } = require("./configs/db")
const { userRouter } = require("./router/user.router")
const cookieParser = require("cookie-parser")
const { authanticate } = require("./middleware/authanticate")
const { dataRouter } = require("./router/userDataRoute")
const {passport} = require("./middleware/google_oAuth")
const cors = require("cors")
const { oauth } = require("./router/githubOauth")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", authanticate, (req, res) => {
    res.send({ "msg": "welcome to backend" })
})


app.use("/user",userRouter)
app.use("/auth",oauth)


// app.use(authanticate)
app.use("/app", dataRouter)


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req.user);
        res.redirect('/')
    });


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to DB");
    }
    catch (err) {
        console.log('Something went wrong');
        console.log(err.messsage);
    }
    console.log(`App is running at port ${process.env.port}`);
})