var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Schema = new Schema({
    Project:{
        type:String,
        required:true
    },
    BugType:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    OperatingSys:{
        type:String,
        required:true
    },
    Priority:{
        type:String,
        required:true
    },
    Assignee:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
});

mongoose.model("defect", Schema);