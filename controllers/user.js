var collection;
var ObjectId = require('mongodb').ObjectId;

exports.setDBConnectionsFromApp = function (app) {
    collection = app.get("dbConnection").collection("user");
}

exports.getAllUser = async function (req, res) {
    try {
        res.type('application/json');
        var docs = await collection.find({}).toArray();

        var userList = [];
        for (var i = 0; i < docs.length; i++) {
            var user = docs[i];
            var newUser = {};
            newUser.id = user._id;
            newUser.email = user.email;
            newUser.userType = user.userType;
            newUser.profileId = user.profileId;
            newUser.dateCreated = user.dateCreated;
            newUser.dateLastModified = user.dateLastModified;

            userList.push(newUser);
        }
        res.status(200);
        res.json({users : userList});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.getUser = async function (req, res) {
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
        var user = await collection.findOne({"_id":objID});

        if (!user) {
            res.status(400);
            res.json({success:false, msg:"User not found"});
        } else {
            var newUser = {};
            newUser.id = user._id;
            newUser.email = user.email;
            newUser.userType = user.userType;
            newUser.profileId = user.profileId;
            newUser.dateCreated = user.dateCreated;
            newUser.dateLastModified = user.dateLastModified;

            res.status(200);
            res.json(newUser);
        }
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.createUser = async function (req, res) {
    var user = req.body;
    var newUser = {};
    newUser.email = user.email;
    newUser.password = user.password
    newUser.userType = user.userType;
    newUser.profileId = user.profileId;
    newUser.dateCreated = new Date().toISOString();
    newUser.dateLastModified = new Date().toISOString();

    try {
        res.type('application/json');
        var result = await collection.insertOne(newUser);

        if (!result.acknowledged) {
            res.status(400);
            res.json({ success:false, msg: "User creation failed" });
        } else {
            res.status(201);
            res.json({ success:true, msg: "User Created" })
        }
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.updateUser = async function (req, res) {
    var user = req.body;
    user.dateLastModified = new Date().toISOString();

    var objID;
    try {
        objID = new ObjectId(req.params.id);
    } catch (e) {
        res.status(500);
        res.send({success:false, msg:"Invalid user id"});
        return;
    }

    try {
        res.type('application/json');
        var result = await collection.updateOne({"_id": objID}, {"$set": user});

        if (result == null) {
            res.status(400);
            res.send({success:false, msg:"User update failed"});
            return;
        }
        res.status(200);
        res.json({success:true, msg:"User updated successfully"});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.deleteUser = async function (req, res) {
    // Check for valid objectID
    var objID;
    try {
        objID = new ObjectId(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid user id"});
        return;
    }

    try {
        res.type('application/json');
        var result = await collection.deleteOne({"_id": objID});

        if (result.deletedCount === 0) {
            res.status(400);
            res.send({success:false, msg:"User deletion failed"});
            return;
        }
        res.status(200);
        res.json({success:true, msg:"User deletion successful"})
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}
