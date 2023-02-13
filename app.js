var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
const { response } = require("express");
var port = process.env.port||3000;
var db = require("./config/database.js");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname+'/dts'));

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require('./config/DefectSchema.js');
var defect = mongoose.model("defect")

// Main route
app.get('/', function(req, res){
    //res.send('No');
    res.redirect('./index.html');
});

// Call the addBug function
app.post('/addBug', function(req,res){
    var addBug = {
        Project:req.body.Project,
        BugType:req.body.BugType,
        Description:req.body.Description,
        OperatingSys:req.body.OperatingSys,
        Priority:req.body.Priority,
        Assignee:req.body.Assignee,
        Status:req.body.Status
    }
    new defect(req.body).save().then(function(){
        console.log(addBug)
        res.redirect('./index.html');
    })
})

app.get('/getDefectList', function(req, res){
    defect.find({}).then(function(index){
        res.json({index});
    })
})

app.post('/deleteBug', function(req, res){
    console.log(`Defect deleted ${req.body.index}`)
    defect.findByIdAndDelete(req.body.index).exec()
    res.redirect('./index.html');
})

app.listen(port, function(){
    console.log(`Running on port ${port}.`);
})