var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;
var db = require("./config/database");
const { secureHeapUsed } = require("crypto");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI, {
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");

//example routes
app.get("/", function(req,res){
    res.send("gameList.html");
});

app.get("/poop", function(req,res)
{
    res.send("You suck");
})

app.use(express.static(__dirname+"/pages"))
app.post("/saveGame", function(req,res)
{
    
        console.log(req.body)
        new Game(req.body).save().then(function(){
            res.redirect("gameList.html")
        })
    
})


app.get("/getGames", function(req,res){
        Game.find({}).then(function(game){
            //console.log({game});
            res.json({game}); 
        });
});


//getting game
app.get("/getGames", function(req,res)
{
    Game.find({}).then(function(game)
    {
        //console.log({game});
        res.json({game});
    })
})

//for deleting game,
app.post("/deleteGame", function(req,res)
{
    console.log(`Game Deleted ${req.body.game._id}`);
    Game.findByIdAndDelete(req.body.game._id).exec();
    res.redirect(``);
})

app.post("/getID::id", function(req,res){
    console.log(req.body.game._id);
    res.redirect("updatePage.html" + "?" + req.body.game);
});


//update route  USE NPX NODEMON
app.post("/updateGame", function(req,res)
{
    console.log(req.body);
    //res.redirect('gameList.html')
    Game.findByIdAndUpdate(req.body.id, {game:req.body.game}, function()
    {
      res.redirect("gameList.html");  
    });
})

//Unity Route
app.post("/unity", function(req, res){
    console.log("Hello from Unity");

    var newData = {
        "level": req.body.level,
        "timeElasped": req.body.timeElasped, 
        "name": req.body.name
    }
    console.log(newData)
});

app.get("/SendUnityData", function(req,res){
    console.log("Request Made");
    var dataToSend = {
        "level": 9000,
        "timeElasped": 201000.32, 
        "name": "Pat"
    }
    res.send(dataToSend);
});

app.use(express.static(__dirname+"/pages"));
app.listen(port, function()
{
    console.log(`Running on port ${port}`)
})