/// <reference path="./typings/tsd.d.ts" />
var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://localhost/stdData");
var userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    Password: { type: String, required: true },
    fatherName: { type: String },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    email: { type: String, required: true }
});
var userModel = mongoose.model("users", userSchema);
function initializeModels(app) {
    app.post('/insert', function (req, res) {
        var users = new userModel({
            userName: req.body.name,
            Password: req.body.pass,
            fatherName: req.body.fname,
            day: parseInt(req.body.bday),
            month: parseInt(req.body.bmonth),
            year: parseInt(req.body.byear),
            email: req.body.email
        });
        users.save(function (err, success) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ message: "Inserted Successfully", data: success });
            }
        });
    });
    app.post('/login', function (req, res) {
        userModel.find({
            email: req.body.email,
            Password: req.body.pass
        }, function (err, data) {
            if (err) {
                res.write(err);
            }
            else {
                res.send(data);
                var stdData = data;
                console.log(stdData);
            }
        });
    });
}
exports.initializeModels = initializeModels;
