var collection;

exports.setDBConnectionsFromApp = function (app) {
    collection = app.get("dbConnection").collection("zipcode");
}

exports.getAllZipcode = async function (req, res) {
    try {
        res.type('application/json');
        var docs = await collection.find({}).toArray();

        var zipList = [];
        for (var i = 0; i < docs.length; i++) {
            var zipcode = docs[i];
            var newZipcode = {};
            newZipcode.id = zipcode._id;
            newZipcode.zip = zipcode.zip;
            newZipcode.city = zipcode.city;
            newZipcode.state = zipcode.state;
            newZipcode.latitude = zipcode.latitude;
            newZipcode.longitude = zipcode.longitude;

            zipList.push(newZipcode);
        }
        res.status(200);
        res.json({zipcodes : zipList});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.getZipcode = async function (req, res) {
    try {
        res.type('application/json');
        var zipcode = await collection.findOne({"zip": parseInt(req.params.zip)});

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
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.getLatLong = async function (req, res) {
    try {
        var zipcode = await collection.findOne({"zip": parseInt(req.params.zip)});

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
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}
