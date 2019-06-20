const ObjectID = require( 'mongodb' ).ObjectID;
let collection;

exports.setDBConnectionsFromApp = (app) => {
    collection = app.get( 'db' ).collection( 'zipcode' );
}

exports.getAllZipcode = (req, res) => {
    
    collection.find({}, (err, docsCursor) => {
        res.type('application/json');
        if (err) {
            res.status(500);
            res.send({success:false, msg:"Database Error"});
            return;
        }

        var zipList = [];
        docsCursor.each(function (err, zipcode) {
            if (zipcode != null) {
                var newZipcode = {};
                newZipcode.id = zipcode._id;
                newZipcode.zip = zipcode.zip;
                newZipcode.city = zipcode.city;
                newZipcode.state = zipcode.state;
                newZipcode.latitude = zipcode.latitude;
                newZipcode.longitude = zipcode.longitude;

                zipList.push(newZipcode);
            } else {
                res.status(200);
                res.json({zipcodes : zipList});
            }
        });
    });
}

exports.getZipcode = (req, res) => {

    collection.findOne({"zip": parseInt(req.params.zip)}, (err, zipcode) => {
        res.type('application/json');

        if (zipcode != null) {
            var newZipcode = {};
            newZipcode.id = zipcode._id;
            newZipcode.zip = zipcode.zip;
            newZipcode.city = zipcode.city;
            newZipcode.state = zipcode.state;
            newZipcode.latitude = zipcode.latitude;
            newZipcode.longitude = zipcode.longitude;
            res.status(200);
            res.json(newZipcode);
        } else {
            res.status(400);
            res.json({success:false, msg:"Zipcode not found"});
        }
    });
}

exports.getLatLong = (req, res) => {
    
    collection.findOne({"zip": parseInt(req.params.zip)}, (err, zipcode) => {
        if (zipcode != null) {
            var zipLoc = {};
            var latLong = [];
            latLong.push(zipcode.latitude);
            latLong.push(zipcode.longitude);
            zipLoc.latLong = latLong;
            res.status(200);
            res.json(zipLoc);
        } else {
            res.status(400);
            res.json({success:false, msg:"Zipcode not found"});
        }
    });
}
