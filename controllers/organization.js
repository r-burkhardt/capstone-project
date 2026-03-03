var collection;
var ObjectId = require('mongodb').ObjectId;

exports.setDBConnectionsFromApp = function (app) {
    collection = app.get("dbConnection").collection("organization");
}

exports.getAllOrg = async function (req, res) {
    try {
        res.type('application/json');
        var docs = await collection.find({}).toArray();

        var organizationList = [];
        for (var i = 0; i < docs.length; i++) {
            var organization = docs[i];
            var newOrganization = {};
            newOrganization.id = organization._id;
            newOrganization.name = organization.name;
            newOrganization.street = organization.street;
            newOrganization.zipcode = organization.zipcode;
            newOrganization.latitude = organization.latLong[0];
            newOrganization.longitude = organization.latLong[1];
            newOrganization.website = organization.website;
            newOrganization.email = organization.email;
            newOrganization.phone = organization.phone;
            newOrganization.contact = organization.contact;
            newOrganization.about = organization.about;
            newOrganization.dateCreated = organization.dateCreated;
            newOrganization.dateLastModified = organization.dateLastModified;

            organizationList.push(newOrganization);
        }
        res.status(200);
        res.json({organizations : organizationList});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.getOrg = async function (req, res) {
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
        var organization = await collection.findOne({"_id": objID});

        if (organization != null) {
            var newOrganization = {};
            newOrganization.id = organization._id;
            newOrganization.name = organization.name;
            newOrganization.street = organization.street;
            newOrganization.zipcode = organization.zipcode;
            newOrganization.latitude = organization.latLong[0];
            newOrganization.longitude = organization.latLong[1];
            newOrganization.website = organization.website;
            newOrganization.email = organization.email;
            newOrganization.phone = organization.phone;
            newOrganization.contact = organization.contact;
            newOrganization.about = organization.about;
            newOrganization.dateCreated = organization.dateCreated;
            newOrganization.dateLastModified = organization.dateLastModified;

            res.status(200);
            res.json(newOrganization);
        } else {
            res.status(400);
            res.json({success:false, msg:"Organization not found"});
        }
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.getOrgNearBy = async function (req, res) {
    var latitude = req.params.lat;
    var longitude = req.params.long;
    var distance = ((req.params.distance * 1.60934 ) / 6371 ); // distance in miles divided by 3959, in km / 6371
    try {
        res.type('application/json');
        var docs = await collection.find({"latLong":{$near:[parseFloat(latitude), parseFloat(longitude)], $maxDistance: parseFloat(distance)}}).toArray();

        var organizationList = [];
        for (var i = 0; i < docs.length; i++) {
            var organization = docs[i];
            var newOrganization = {};
            newOrganization.id = organization._id;
            newOrganization.name = organization.name;
            newOrganization.street = organization.street;
            newOrganization.zipcode = organization.zipcode;
            newOrganization.latitude = organization.latLong[0];
            newOrganization.longitude = organization.latLong[1];
            newOrganization.website = organization.website;
            newOrganization.email = organization.email;
            newOrganization.phone = organization.phone;
            newOrganization.contact = organization.contact;
            newOrganization.about = organization.about;
            newOrganization.dateCreated = organization.dateCreated;
            newOrganization.dateLastModified = organization.dateLastModified;

            organizationList.push(newOrganization);
        }
        res.status(200);
        res.json({organizations : organizationList});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.createOrg = async function (req, res) {
    var organization = req.body;
    var newOrganization = {};
    newOrganization.name = organization.name;
    newOrganization.street = organization.street;
    newOrganization.zipcode = organization.zipcode;
    newOrganization.latLong = [organization.latitude, organization.longitude];
    newOrganization.website = organization.website;
    newOrganization.email = organization.email;
    newOrganization.phone = organization.phone;
    newOrganization.contact = organization.contact;
    newOrganization.about = organization.about;
    newOrganization.dateCreated = new Date().toISOString();
    newOrganization.dateLastModified = new Date().toISOString();

    try {
        res.type('application/json');
        var result = await collection.insertOne(newOrganization);

        if (result.acknowledged) {
            res.status(201);
            res.json({ success:true, msg: "Organization Created" });
        } else {
            res.status(400);
            res.json({ success: false, msg: "Organization creation failed" });
        }
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.updateOrg = async function (req, res) {
    var organization = req.body;
    organization.dateLastModified = new Date().toISOString();

    // Check for valid objectID
    var objID;
    try {
        objID = new ObjectId(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid organization id"});
        return;
    }

    try {
        res.type('application/json');
        var result = await collection.updateOne({"_id": objID}, {"$set": organization});

        if (result == null) {
            res.status(400);
            res.send({success:false, msg:"Organization update failed"});
            return;
        }
        res.status(200);
        res.json({success:true, msg:"Organization updated successfully"});
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}

exports.deleteOrg = async function (req, res) {
    // Check for valid objectID
    var objID;
    try {
        objID = new ObjectId(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid organization id"});
        return;
    }

    try {
        res.type('application/json');
        var result = await collection.deleteOne({"_id": objID});

        if (result.deletedCount === 0) {
            res.status(400);
            res.send({success:false, msg:"Organization deletion failed"});
            return;
        }
        res.status(200);
        res.json({success:true, msg:"Organization deletion successful"})
    } catch (err) {
        res.status(500);
        res.send({success:false, msg:"Database error"});
    }
}
