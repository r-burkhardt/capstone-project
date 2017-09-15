var express = require('express');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// Database Connection Information
var db;
var mongodbURL;

// Get enviromental variables
var program_name = process.argv[0];
var script_path = process.argv[1];
var port_string = process.argv[2];
var env_value = process.argv[3];

console.log("program_name=" + program_name);
console.log("script_path=" + script_path);
console.log("port_string=" + port_string);

var port_value = "4500";

if (typeof port_string !== "undefined" && port_string.length > 0) {
    port_value = port_string;
}

if (env_value === "undefined") {
    console.log("env_value is not set");
    return -1;
} else {
    switch (env_value) {
        case "DEV":
            mongodbURL = "mongodb://104.198.193.53:27017/TeamBuilder";
            console.log("enviroment = " + mongodbURL);
            break;

        default:
            console.log("env_value is not valid: " + env_value);
            return -1;
    }
}

app.set('public', path.join(__dirname, 'public'));

console.log(__dirname);
console.log(__filename);
console.log(app.get('public'));

app.use(express.static(app.get('public')));

app.listen(Number(port_value));
console.log('Server is running on port ' + port_value);