/// <reference path="./typings/tsd.d.ts" />
// requiring of modules starts
var mongoData_1 = require("./mongoData");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
// requiring of modules ends
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
mongoData_1.initializeModels(app);
app.use(morgan("short"));
//EjS code starts
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/home", function (req, res) {
    res.render("index");
});
//EjS code ends
//sending index html to client starts
var publicPath = path.resolve(__dirname + "/public");
app.use(express.static(publicPath));
app.use("/", function (req, res, next) {
    res.sendFile(path.resolve(__dirname + "/public/index.html"));
    next();
});
app.use("/login", function (req, res, next) {
    res.sendFile(path.resolve(__dirname + "/public/login.html"));
    next();
});
app.use("/add", function (req, res, next) {
    res.sendFile(path.resolve(__dirname + "/public/add.html"));
    res.end;
});
//sending index html to client ends
// server initializing code starts
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('you are listening to the port' + port);
});
// server initializing ends 
