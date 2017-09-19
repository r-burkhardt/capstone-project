var dbConnection;
var collection;
var ObjectID = require('mongodb').ObjectID;

exports.setDBConnectionsFromApp = function (app) {
    dbConnection = app.get("dbConnection");
    collection = dbConnection.collection("users");
}

