const mongoose = require("mongoose")


const userDataSchema = mongoose.Schema({
    startTime: { type: Date },
    productiveTimeElapsed: { type: String },
    unproductiveTimeElapsed: { type: String },
    idleTimeElapsed: { type: String },
    deskTimeElapsed: { type: String }
})

const userDataModel = mongoose.model("time", userDataSchema)

module.exports = { userDataModel }