var dbConnection;
var collection;

exports.setDBConnectionsFromApp = function (app) {
    dbConnection = app.get("dbConnection");
    collection = dbConnection.collection("player");
}

exports.getAllPlayer = function (req, res) {
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
                // Loop through injuries to add to injury item
                // var i;
                var injuryList = [];
                for (i = 0; i < player.injuries.length; i++) {
                    injuryList.push( player.injuries[ i ]);
                }
                newPlayer.injuries = injuryList;
                newPlayer.pointAvg = player.pointAvg;
                // Player ranking
                newPlayer.totalRank = player.totalRank;
                // newPlayer.ageRank = player.ageRank;
                // newPlayer.heightRank = player.heightRank;
                // newPlayer.yrsPlayRank = player.yrsPlayRank;
                // newPlayer.skillRank = player.skillRank;
                // newPlayer.injuryRank = player.injuryRank;
                // Player modifications
                newPlayer.dateCreated = player.dateCreated;
                newPlayer.dateLastModified = player.dateLastModified;
    
                // console.log((new Date() - new Date(player.dateOfBirth))/1000/60/60/24/365);

                playerList.push(newPlayer);
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
            // Loop through injuries to add to injury item
            // var i;
            var injuryList = [];
            for (i = 0; i < player.injuries.length; i++) {
                injuryList.push( player.injuries[ i ]);
            }
            newPlayer.injuries = injuryList;
            newPlayer.pointAvg = player.pointAvg;
            // Player ranking
            newPlayer.totalRank = player.totalRank;
            // newPlayer.ageRank = player.ageRank;
            // newPlayer.heightRank = player.heightRank;
            // newPlayer.yrsPlayRank = player.yrsPlayRank;
            // newPlayer.skillRank = player.skillRank;
            // newPlayer.injuryRank = player.injuryRank;
            // Player modifications
            newPlayer.dateCreated = player.dateCreated;
            newPlayer.dateLastModified = player.dateLastModified;
            
            res.status(200);
            res.json(newPlayer);
        } else {
            res.status(400);
            res.json({success:false, msg:"Player not found"});
        }
    });
}

exports.getPlayerNearBy = function (req, res) {
    var latitude = req.params.lat;
    var longitude = req.params.long;
    var distance = ((req.params.distance * 1.60934 ) / 6371 ); // distance in miles divided by 3959, in km / 6371
    console.log(distance);
    
    var players = collection.find({"latLong":{$near:[parseFloat(latitude), parseFloat(longitude)], $maxDistance: parseFloat(distance)}}, function (err, docsCursor) {
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
                // Loop through injuries to add to injury item
                // var i;
                var injuryList = [];
                for (i = 0; i < player.injuries.length; i++) {
                    injuryList.push( player.injuries[ i ]);
                }
                newPlayer.injuries = injuryList;
                newPlayer.pointAvg = player.pointAvg;
                // Player ranking
                newPlayer.totalRank = player.totalRank;
                // newPlayer.ageRank = player.ageRank;
                // newPlayer.heightRank = player.heightRank;
                // newPlayer.yrsPlayRank = player.yrsPlayRank;
                // newPlayer.skillRank = player.skillRank;
                // newPlayer.injuryRank = player.injuryRank;
                // Player modifications
                newPlayer.dateCreated = player.dateCreated;
                newPlayer.dateLastModified = player.dateLastModified;
                
                playerList.push(newPlayer);
            } else {
                res.status(200);
                res.json({players : playerList});
            }
        });
    });
}

exports.createPlayer = function (req, res) {
    
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
    // newPlayer.ageRank = player.ageRank;
    // newPlayer.heightRank = player.heightRank;
    // newPlayer.yrsPlayRank = player.yrsPlayRank;
    // newPlayer.skillRank = player.skillRank;
    // newPlayer.injuryRank = player.injuryRank;
    newPlayer.dateCreated = new Date ().format ( 'c' );
    newPlayer.dateLastModified = new Date ().format ( 'c' );

    // Add possible check feature here around insert
    var players = collection.insertOne ( newPlayer, function ( err, returnPlayer ) {
        res.type ( 'application/json' );
    
        if ( returnPlayer != null ) {
            res.status ( 201 );
            res.json ( { success:true, msg: "Player Created" } );
        } else {
            res.status ( 400 );
            res.json ( { success: false, msg: "Player creation failed" } );
        }
    });
}

exports.updatePlayer = function (req, res) {
    var player = req.body;
    player.dateLastModified = new Date().format('c');

    // Check for valid objectID
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid player id"});
        return;
    }

    var players = collection.update({"_id": objID}, {"$set": player}, function ( err, result ) {
        res.type('application/json');

        if ( result == null ) {
            res.status(400);
            res.send({success:false, msg:"Player update failed"});
            return;
        }
        res.status(200);
        res.json({sucess:true, msg:"Player updated successfully"});
    });
}

exports.deletePlayer = function (req, res) {
    // Check for valid objectID
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid player id"});
        return;
    }
    
    var players = collection.remove({"_id": objID}, function ( err, status ) {
        res.type('application/json');
        
        if (status.result.n == 0) {
            res.status(400);
            res.send({success:false, msg:"Player deletion failed"});
            return;
        }
        res.status(200);
        res.json({sucess:true, msg:"Player deletion successful"})
    });
}














