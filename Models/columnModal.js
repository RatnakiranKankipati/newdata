const mongoose = require("mongoose")

const columnSchema = new mongoose.Schema({
    _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
    Userid: {
        type: String,
        required: true,
        unique: true,
    },
    WorkItemId: {
        type: Boolean,
        default:false
    },
    Input: {
        type: Boolean,
        default:false
    },
    Output: {
        type: Boolean,
        default:false
    },
    Log: {
        type: Boolean,
        default:false
    },
    Status: {
        type: Boolean,
        default:false
    },
    CreatedOn: {
        type: Boolean,
        default:false
    },
    JobId: {
        type: Boolean,
        default:false
    },
    EqpCount: {
        type: Boolean,
        default:false
    },
    SheetCount: {
        type: Boolean,
        default:false
    },
    Duration: {
        type: Boolean,
        default:false
    },
    ErrorType: {
        type: Boolean,
        default:false
    }
})


const column = new mongoose.model("columns", columnSchema)

module.exports = column
