var dbConnection;
var collection;
var ObjectID = require('mongodb').ObjectID;

exports.setDBConnectionsFromApp = function (app) {
    dbConnection = app.get("dbConnection");
    collection = dbConnection.collection("user");
}

exports.getAllUser = function (req, res) {
    var users = collection.find({}, function (err, docsCursor) {
        res.type('application/json');
        if (err) {
            res.status(500);
            res.send({success:false, msg:"Database error"});
            return;
        }

        var userList = [];
    });
}

exports.getUser = function (req, res) {
    
}

exports.createUser = function (req, res) {
    
}

exports.updateUser = function (req, res) {
    
}

exports.deleteUser = function (req, res) {
    
}
