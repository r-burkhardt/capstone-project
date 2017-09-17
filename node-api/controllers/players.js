var dbConnection;
var collection;
var ObjectID = require('mongodb').ObjectID;

exports.setDBConnectionsFromApp = function (app) {
    dbConnection = app.get("dbConnection")
    collection = dbConnection.collection("players");
}

exports.getAllPLayers = function (req, res) {
    var players = collection.find({}, function (err, docsCursor) {
        res.type('application/json');
        if (err) {
            res.status(500);
            res.send({success:false, msg:"Database error"});
            return;
        }

        var playerList = [];
        docsCursor.each(function (err, player) {
            if (player != null) {
                var newPlayer = {};
                newPlayer.id = player._id;
                newPlayer.userId = player.userId; // used to connect player profile to user account
                newPlayer.status = player.status;
                newPlayer.firstName = player.firstName;
                newPlayer.lastName = player.lastName;
                newPlayer.email = player.email;
                newPlayer.phone = player.phone;
                newplayer.zipcode = player.zipcode;
                newplayer.latitude = player.latLong[0];
                newPlayer.longitude = player.latLong[1];
                newplayer.dateOfBirth = player.dateOfBirth;
                newPlayer.heightFeet = player.height[0];
                newPlayer.heightInch = player.height[1];
                newPlayer.yrsPlay = player.yrsPlay;
                newPlayer.injuries = player.injuries;
                newPlayer.pointAvg = player.pointAvg;
                // Player ranking
                newPlayer.totalRank = player.totalRank;
                newPlayer.ageRank = player.ageRank;
                newPlayer.heightRank = player.heightRank;
                newPlayer.yrsPlayRank = player.yrsPlayRank;
                newPlayer.skillRank = player.skillRank;
                newPlayer.injuryRank = player.injuryRank;

                playerList.push(newPlayer);
                // organizationId
            } else {
                res.status(200);
                res.json({players : playerList});
            }
        });
    });
}

exports.getPlayer = function (req, res) {
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch (e) {
        res.status(500);
        res.send({success:false, msg:"Invalid id"});
        return;
    }

    var players = collection.findOne({"_id": objID}, function (err, player) {
        res.type('application/json');

        if (player != null) {
            var newPlayer = {};
            newPlayer.id = player._id;
            newPlayer.userId = player.userId; // used to connect player profile to user account
            newPlayer.status = player.status;
            newPlayer.firstName = player.firstName;
            newPlayer.lastName = player.lastName;
            newPlayer.email = player.email;
            newPlayer.phone = player.phone;
            newplayer.zipcode = player.zipcode;
            newplayer.latitude = player.latLong[0];
            newPlayer.longitude = player.latLong[1];
            newplayer.dateOfBirth = player.dateOfBirth;
            newPlayer.heightFeet = player.height[0];
            newPlayer.heightInch = player.height[1];
            newPlayer.yrsPlay = player.yrsPlay;
            newPlayer.injuries = player.injuries;
            newPlayer.pointAvg = player.pointAvg;
            // Player ranking
            newPlayer.totalRank = player.totalRank;
            newPlayer.ageRank = player.ageRank;
            newPlayer.heightRank = player.heightRank;
            newPlayer.yrsPlayRank = player.yrsPlayRank;
            newPlayer.skillRank = player.skillRank;
            newPlayer.injuryRank = player.injuryRank;
            res.status(200);
            res.json(newPlayer);
        } else {
            res.status(400);
            res.json({success:false, msg:"Player not found"});
        }
    })
}

exports.getPlayersNearBy = function (req, res) {
    var latitude = req.params.latitude;
    var longitude = req.params.longitude;
    
    var players = collection.find({"loc":{$near:[parseFloat(latitude), parseFloat(longitude)]}}, function (err, docsCursor) {
        res.type('application/json');
        if (err) {
            res.status(500);
            res.send({success:false, msg:"Database error."});
            return;
        }

        var playerList = [];
        docsCursor.each(function (err, player) {
            if (player != null) {
                var newPlayer = {};
                newPlayer.id = player._id;
                newPlayer.userId = player.userId; // used to connect player profile to user account
                newPlayer.status = player.status;
                newPlayer.firstName = player.firstName;
                newPlayer.lastName = player.lastName;
                newPlayer.email = player.email;
                newPlayer.phone = player.phone;
                newplayer.zipcode = player.zipcode;
                newplayer.latitude = player.latLong[0];
                newPlayer.longitude = player.latLong[1];
                newplayer.dateOfBirth = player.dateOfBirth;
                newPlayer.heightFeet = player.height[0];
                newPlayer.heightInch = player.height[1];
                newPlayer.yrsPlay = player.yrsPlay;
                newPlayer.injuries = player.injuries;
                newPlayer.pointAvg = player.pointAvg;
                // Player ranking
                newPlayer.totalRank = player.totalRank;
                newPlayer.ageRank = player.ageRank;
                newPlayer.heightRank = player.heightRank;
                newPlayer.yrsPlayRank = player.yrsPlayRank;
                newPlayer.skillRank = player.skillRank;
                newPlayer.injuryRank = player.injuryRank;

                playerList.push(newPlayer);
                // organizationId
            } else {
                res.status(200);
                res.json({players : playerList});
            }
        });
    });
}

exports.createPlayer = function (req, res) {
    
}

exports.updatePlayer = function (req, res) {
    
}

exports.deletePlayer = function (req, res) {
    
}














