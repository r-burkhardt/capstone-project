var dbConnection;
var collection;

exports.setDBConnectionsFromApp = function (app) {
    dbConnection = app.get("dbConnection");
    collection = dbConnection.collection("user");
}

exports.getAllUser = function (req, res) {
    var users = collection.find({}, function (err, docsCursor) {
        res.type('application/json');
        if (err) {
            res.status(500);
            res.send({success:false, msg:"Database error"});
            return;
        }

        var userList = [];
        docsCursor.each(function ( err, user ) {
            if (!user) {
                res.status(200);
                res.json({users : userList});
            } else {
                var newUser = {};
                newUser.id = user._id;
                newUser.email = user.email;
                newUser.userType = user.userType;
                newUser.profileId = user.profileId;
                newUser.dateCreated = user.dateCreated;
                newUser.dateLastModified = user.dateLastModified;
                
                userList.push(newUser);
            }
        });
    });
}

exports.getUser = function (req, res) {
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch (e) {
        res.status(500);
        res.send({sucess:false, msg:"Invalid id"});
        return;
    }
    
    var users = collection.findOne({"_id":objID}, function ( err, user ) {
        res.type('application/json');
        
        if (!user) {
            res.status(400);
            res.json({success:false, msg:"Player not found"});
        } else {
            var newUser = {};
            newUser.id = user._id;
            newUser.email = user.email;
            newUser.userType = user.userType;
            newUser.profileId = user.profileId;
            newUser.dateCreated = user.dateCreated;
            newUser.dateLastModified = user.dateLastModified;
            
            res.status(200);
            res.json(user);
        }
    });
}

exports.createUser = function (req, res) {
    var user = req.body;
    var newUser = {};
    newUser.email = user.email;
    newUser.password = user.password
    newUser.userType = user.userType;
    newUser.profileId = user.profileId;
    newUser.dateCreated = new Date ().format ( 'c' );
    newUser.dateLastModified = new Date ().format ( 'c' );
    
    var users = collection.insertOne( newUser, function ( err, returnUser ) {
        res.type('application/json');
        
        if (!returnUser) {
            res.status(400);
            res.json({ success:true, msg: "User creation failed" });
        } else {
            res.status(201);
            res.json({ success:true, msg: "User Created" })
        }
    });
}

exports.updateUser = function (req, res) {
    var user = req.body;
    user.dateLastModified = new Date().format('c');

    // Check for valid objectID
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch (e) {
        res.status(500);
        res.send({success:false, msg:"Invalid user id"});
        return;
    }
    
    var users = collection.update({"_id": objID}, {"$set": user}, function ( err, result ) {
        res.type('application/json');
        
        if ( result == null ) {
            res.status(400);
            res.send({success:false, msg:"User update failed"});
            return;
        }
        res.status(200);
        res.json({sucess:true, msg:"User updated successfully"});
    });
}

exports.deleteUser = function (req, res) {
    // Check for valid objectID
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid user id"});
        return;
    }
    
    var users = collection.remove({"_id": objID}, function ( err, status ) {
        res.type('application/json');
        
        if (status.result.n == 0) {
            res.status(400);
            res.send({success:false, msg:"User deletion failed"});
            return;
        }
        res.status(200);
        res.json({sucess:true, msg:"User deletion successful"})
    });
}
