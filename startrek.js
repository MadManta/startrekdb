var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var characters = [{
    routeName: "sisko",
    name: "Benjamin Sisko",
    title: "Captain",
    age: 43,
    powerlvl: 1000
}, {
    routeName: "kira",
    name: "Kira Nerys",
    title: "Second in Command",
    age: 38,
    powerlvl: 1800
},{
    routeName: "dax",
    name: "Jadzia Dax",
    title: "Chief Science Officer",
    age: 32,
    powerlvl: 800
}];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});  
  
app.get("/all", function(req, res) {
    res.json(characters);
  }); 

app.get("/api/:trek?", function(req, res) {
    var chosen = req.params.trek;
  
    if (chosen) {
        console.log(chosen);
        for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            res.json(characters[i]);
            return;
            };
        };
        return res.send("No character found");
    };
    return res.json(characters);
});
  
app.post("/api/new", function(req, res) {
    var newcharacter = req.body;
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
    console.log(newcharacter);
    characters.push(newcharacter);
    res.json(newcharacter);
  });
  
  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});