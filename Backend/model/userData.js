const mongoose = require("mongoose")


const userDataSchema = mongoose.Schema({
    startTime: { type: Date },
    productiveTimeElapsed: { type: Number },
    unproductiveTimeElapsed: { type: Number },
    idleTimeElapsed: { type: Number },
    deskTimeElapsed: { type: Number },
    timeAtWorkTimeElapsed : {type: Number}
})

const userDataModel = mongoose.model("time", userDataSchema)

module.exports = { userDataModel }