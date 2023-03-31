const express = require("express")
const { userDataModel } = require("../model/userData")


const dataRouter = express.Router()

dataRouter.post("/myTimeFrame", async (req, res) => {
    try {
        const { arrivalTime,
            productiveTimeElapsed,
            unproductiveTimeElapsed,
            idleTimeElapsed,
            deskTimeElapsed } = req.body;

        const existingRecord = await userDataModel.findOne({ arrivalTime });

        if (existingRecord) {
            await userDataModel.updateOne({ arrivalTime }, {
                $set: {
                    productiveTimeElapsed,
                    unproductiveTimeElapsed,
                    idleTimeElapsed,
                    deskTimeElapsed
                }
            });
            res.send({ "msg": "updated the timeFrames" });
        } else {
            await new userDataModel({
                arrivalTime,
                productiveTimeElapsed,
                unproductiveTimeElapsed,
                idleTimeElapsed,
                deskTimeElapsed
            }).save();
            res.send({ "msg": "stored the timeFrames" });
        }
    } catch (error) {
        res.send({ "error": error.message });
    }

})


module.exports = { dataRouter }