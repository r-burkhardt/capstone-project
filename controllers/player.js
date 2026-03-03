var collection;
var ObjectId = require('mongodb').ObjectId;

exports.setDBConnectionsFromApp = function (app) {
    collection = app.get("dbConnection").collection("player");
}

exports.getAllPlayer = async function (req, res) {
    try {
        res.type('application/json');
        var docs = await collection.find({}).toArray();

        var playerList = [];
        for (var i = 0; i < docs.length; i++) {
            var player = docs[i];
            var newPlayer = {};
            newPlayer.id = player._id;
            newPlayer.userID = player.userID; // used to connect player profile to user account
            newPlayer.status = player.status;
            newPlayer.firstName = player.firstName;
            newPlayer.lastName = player.lastName;
            newPlayer.email = player.email;
            newPlayer.phone = player.phone;
            newPlayer.zipcode = player.zipcode;
            newPlayer.latitude = player.latLong[0];
            newPlayer.longitude = player.latLong[1];
            newPlayer.dateOfBirth = player.dateOfBirth;
            newPlayer.heightFeet = player.height[0];
            newPlayer.heightInch = player.height[1];
            newPlayer.yearsPlay = player.yearsPlay;
            newPlayer.injuries = player.injuries.slice();
            newPlayer.pointAvg = player.pointAvg;
            // Player ranking
            newPlayer.totalRank = player.totalRank;
            // Player modifications
            newPlayer.dateCreated = player.dateCreated;
            newPlayer.dateLastModified = player.dateLastModified;

            playerList.push(newPlayer);
        }
        res.status(200);
        res.json({players : playerList});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.getPlayer = async function (req, res) {
    var objID;
    try {
        objID = new ObjectId(req.params.id);
    } catch (e) {
        res.status(500);
        res.send({success:false, msg:"Invalid id"});
        return;
    }

    try {
        res.type('application/json');
        var player = await collection.findOne({"_id": objID});

        if (player != null) {
            var newPlayer = {};
            newPlayer.id = player._id;
            newPlayer.userID = player.userID; // used to connect player profile to user account
            newPlayer.status = player.status;
            newPlayer.firstName = player.firstName;
            newPlayer.lastName = player.lastName;
            newPlayer.email = player.email;
            newPlayer.phone = player.phone;
            newPlayer.zipcode = player.zipcode;
            newPlayer.latitude = player.latLong[0];
            newPlayer.longitude = player.latLong[1];
            newPlayer.dateOfBirth = player.dateOfBirth;
            newPlayer.heightFeet = player.height[0];
            newPlayer.heightInch = player.height[1];
            newPlayer.yearsPlay = player.yearsPlay;
            newPlayer.injuries = player.injuries.slice();
            newPlayer.pointAvg = player.pointAvg;
            // Player ranking
            newPlayer.totalRank = player.totalRank;
            // Player modifications
            newPlayer.dateCreated = player.dateCreated;
            newPlayer.dateLastModified = player.dateLastModified;

            res.status(200);
            res.json(newPlayer);
        } else {
            res.status(400);
            res.json({success:false, msg:"Player not found"});
        }
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.getPlayerNearBy = async function (req, res) {
    var latitude = req.params.lat;
    var longitude = req.params.long;
    var distance = ((req.params.distance * 1.60934 ) / 6371 ); // distance in miles divided by 3959, in km / 6371
    try {
        res.type('application/json');
        var docs = await collection.find({"latLong":{$near:[parseFloat(latitude), parseFloat(longitude)], $maxDistance: parseFloat(distance)}}).toArray();

        var playerList = [];
        for (var i = 0; i < docs.length; i++) {
            var player = docs[i];
            var newPlayer = {};
            newPlayer.id = player._id;
            newPlayer.userID = player.userID; // used to connect player profile to user account
            newPlayer.status = player.status;
            newPlayer.firstName = player.firstName;
            newPlayer.lastName = player.lastName;
            newPlayer.email = player.email;
            newPlayer.phone = player.phone;
            newPlayer.zipcode = player.zipcode;
            newPlayer.latitude = player.latLong[0];
            newPlayer.longitude = player.latLong[1];
            newPlayer.dateOfBirth = player.dateOfBirth;
            newPlayer.heightFeet = player.height[0];
            newPlayer.heightInch = player.height[1];
            newPlayer.yearsPlay = player.yearsPlay;
            newPlayer.injuries = player.injuries.slice();
            newPlayer.pointAvg = player.pointAvg;
            // Player ranking
            newPlayer.totalRank = player.totalRank;
            // Player modifications
            newPlayer.dateCreated = player.dateCreated;
            newPlayer.dateLastModified = player.dateLastModified;

            playerList.push(newPlayer);
        }
        res.status(200);
        res.json({players : playerList});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.createPlayer = async function (req, res) {
    var player = req.body;
    var newPlayer = {};
    newPlayer.userID = player.userID; // used to connect player profile to user account
    newPlayer.status = (player.status != null ? player.status : "");
    newPlayer.firstName = player.firstName;
    newPlayer.lastName = player.lastName;
    newPlayer.email = player.email;
    newPlayer.phone = player.phone;
    newPlayer.zipcode = player.zipcode;
    newPlayer.latLong = [ player.latitude, player.longitude ];
    newPlayer.dateOfBirth = player.dateOfBirth;
    newPlayer.height = [ player.heightFeet, player.heightInch ];
    newPlayer.yearsPlay = player.yearsPlay;
    newPlayer.injuries = player.injuries;
    newPlayer.pointAvg = player.pointAvg;
    // Player ranking
    newPlayer.totalRank = player.totalRank;
    newPlayer.dateCreated = new Date().toISOString();
    newPlayer.dateLastModified = new Date().toISOString();

    try {
        res.type('application/json');
        var result = await collection.insertOne(newPlayer);

        if (result.acknowledged) {
            res.status(201);
            res.json({ success:true, msg: "Player Created" });
        } else {
            res.status(400);
            res.json({ success: false, msg: "Player creation failed" });
        }
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.updatePlayer = async function (req, res) {
    var player = req.body;
    player.dateLastModified = new Date().toISOString();

    // Check for valid objectID
    var objID;
    try {
        objID = new ObjectId(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid player id"});
        return;
    }

    try {
        res.type('application/json');
        var result = await collection.updateOne({"_id": objID}, {"$set": player});

        if (result == null) {
            res.status(400);
            res.send({success:false, msg:"Player update failed"});
            return;
        }
        res.status(200);
        res.json({success:true, msg:"Player updated successfully"});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.deletePlayer = async function (req, res) {
    // Check for valid objectID
    var objID;
    try {
        objID = new ObjectId(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid player id"});
        return;
    }

    try {
        res.type('application/json');
        var result = await collection.deleteOne({"_id": objID});

        if (result.deletedCount === 0) {
            res.status(400);
            res.send({success:false, msg:"Player deletion failed"});
            return;
        }
        res.status(200);
        res.json({success:true, msg:"Player deletion successful"})
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}
