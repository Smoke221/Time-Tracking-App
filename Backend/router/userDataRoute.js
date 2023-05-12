const express = require("express")
const { userDataModel } = require("../model/userData")
const { userModel } = require("../model/user.model")

const dataRouter = express.Router()

dataRouter.get('/', (req, res) => {
    res.send("working authentication")
})

dataRouter.post("/myTimeFrame", async (req, res) => {
    try {
        const { startTime,
            productiveTimeElapsed,
            unproductiveTimeElapsed,
            idleTimeElapsed,
            deskTimeElapsed,
            timeAtWorkTimeElapsed} = req.body;

        const existingRecord = await userDataModel.findOne({ startTime });

        if (existingRecord) {
            let existingData = await userDataModel.find()
            await userDataModel.updateOne({ startTime }, {
                $inc: {
                    productiveTimeElapsed,
                    unproductiveTimeElapsed,
                    idleTimeElapsed,
                    deskTimeElapsed,
                    timeAtWorkTimeElapsed
                }
            });
            res.send({ "msg": "updated the timeFrames","data":existingData });
        } else {
            await new userDataModel({
                startTime,
                productiveTimeElapsed,
                unproductiveTimeElapsed,
                idleTimeElapsed,
                deskTimeElapsed,
                timeAtWorkTimeElapsed
            }).save();

            res.send({ "msg": "stored the timeFrames" });
        }
    } catch (error) {
        res.send({ "error": error.message });
    }

})

dataRouter.get("/employees", async (req, res) => {
    try {
        let userInfo = await userModel.find()
        if (userInfo) {
            res.json(userInfo)
        } else {
            res.send({ "msg": "no users present" })
        }
    }
    catch (err) {
        console.log(err);
        res.send({ "msg": "error retrieving data from nongodb" })
    }
})
//get the time 
dataRouter.get("/gettime", async(req,res) => {
    try{
        let data = await userDataModel.find()
        if(data){
            res.json(data)
        }else{
            res.send({"msg": "no data found"})
        }
    }
    catch(err){
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