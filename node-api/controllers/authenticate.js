var dbConnection;
var collection;

exports.setDBConnectionsFromApp = function (app) {
    dbConnection = app.get("dbConnection")
    userCollection = dbConnection.collection("zipcodes");

}

exports.authorize = function (req, res) {
    var users = collection
}

// authenticate