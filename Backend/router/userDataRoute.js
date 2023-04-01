const express = require("express")
const { userDataModel } = require("../model/userData")
const {userModel} = require("../model/user.model")

const dataRouter = express.Router()

dataRouter.get('/', (req, res) => {
    res.send("working authentication")
})

dataRouter.post("/myTimeFrame", async (req, res) => {
    try {
        const { arrivalTime,
            productiveTimeElapsed,
            unproductiveTimeElapsed,
            idleTimeElapsed,
            deskTimeElapsed } = req.body;

        // const existingRecord = await userDataModel.findOne({ arrivalTime });

        // if (existingRecord) {
        //     await userDataModel.updateOne({ arrivalTime }, {
        //         $set: {
        //             productiveTimeElapsed,
        //             unproductiveTimeElapsed,
        //             idleTimeElapsed,
        //             deskTimeElapsed
        //         }
        //     });
        //     res.send({ "msg": "updated the timeFrames" });
        // } else {
        let time = await new userDataModel({
            arrivalTime,
            productiveTimeElapsed,
            unproductiveTimeElapsed,
            idleTimeElapsed,
            deskTimeElapsed
        })
        await time.save();

        res.send({ "msg": "stored the timeFrames" });
        // }
    } catch (error) {
        res.send({ "error": error.message });
    }

})

dataRouter.get("/employees", async (req, res) => {
    try {
        let userInfo = await userModel.find()
        if(userInfo){
            res.json(userInfo)
        }else{
            res.send({"msg":"no users present"})
        }
    }
    catch (err) {
        console.log(err);
        res.send({ "msg": "error retrieving data from nongodb" })
    }
})


dataRouter.delete("/deleteUser/:id", async (req, res) => {
    const userID = req.params.id
    await userModel.findByIdAndDelete({ _id: userID })
    res.send({ 'msg': `user is deleted` })
})



module.exports = { dataRouter }