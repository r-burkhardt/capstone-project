const express = require( 'express' );
const assert = require( 'assert' );
const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectID = require( 'mongodb' ).ObjectID;
const bodyParser = require( 'body-parser' );
const format = require( './utilities/date.format.js' );
const path = require( 'path' );

const app = express();

// Register JSON body parsing for Post, Updates, Deletes, etc.
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

// Database Connection Information
let db;
let mongodbURL;
const apiAccess = "tbaccess";
const apiToken = "8{uKsnpqp)VpbJE)";

// Get enviromental variables
const program_name = process.argv[0];
const script_path = process.argv[1];
const port_string = process.argv[2];
const env_value = process.argv[3];

// console.log( "program_name=" + program_name );
// console.log( "script_path=" + script_path );
console.log( "port_string=" + port_string );
console.log( "ene_value=" + env_value );
console.log( "today in Unix=" + Date.now() / 1000 );
console.log( "today in Readable=" + new Date().format( 'r' ) );

let port_value = "4500";

if ( typeof port_string !== "undefined" && port_string.length > 0 ) {
  port_value = port_string;
}

if ( env_value === "undefined" ) {
  console.log( "env_value is not set" );
  return -1;
} else {
  switch ( env_value ) {
    case "DEV":
      mongodbURL = "mongodb://localhost:27017/teambuilder";
      console.log( "enviroment = " + mongodbURL );
      break;

    case "PROD":
      mongodbURL = "mongodb://" + apiAccess + ":" + apiToken + "@127.0.0.1:27017/teambuilder";
      console.log( "enviroment = " + mongodbURL );
      break;

    default:
      console.log( "env_value is not valid: " + env_value );
      return -1;
  }
}

app.set( 'public', path.join( __dirname, 'public' ) );

app.use( express.static( app.get( 'public' ) ) );

// MongoClient.connect( mongodbURL, (err, dbConnection) => {

//
//   // create location index in players for latLong to 2d location
//   var playerCollection = dbConnection.collection( "player" );
//   playerCollection.createIndex( { "latLong": "2d" } );
//   var organizationCollection = dbConnection.collection( "organization" );
//   organizationCollection.createIndex( { "latLong": "2d" } );

MongoClient.connect( mongodbURL, (err, database) => {
  if ( err ) return console.log( err );
  // console.log( "connected successfully to mongodb server: " + mongodbURL );

  app.set( 'db', database );
  app.route( '/services/v1');
  require( './routes' )( app );

  // Handle 404 issues
  app.use( function (req, res, next) {
    res.status( 404 );
    res.sendFile( path.join( __dirname, './public', '404.html' ) );
  } );

  // Handle stack trace errors
  app.use( function (err, req, res, next) {
    console.error( err.stack );
    res.status( 500 );
    res.sendFile( path.join( __dirname, './public', '500.html' ) );
  } );

  app.listen( Number( port_value ) );
  console.log( 'Server Running on port ' + port_value );
} );
