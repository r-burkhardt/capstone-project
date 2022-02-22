const ObjectID = require( 'mongodb' ).ObjectID;
let collection;

exports.setDBConnectionsFromApp = (app) => {
    collection = app.get( 'db' ).collection( 'zipcodes' );

}

exports.authorize = (req, res) => {
}

// authenticate
