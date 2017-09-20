var dbConnection;
var collection;
var ObjectID = require('mongodb').ObjectID;

exports.setDBConnectionsFromApp = function (app) {
    dbConnection = app.get("dbConnection");
    collection = dbConnection.collection("organization");
}

exports.getAllOrg = function (req, res) {
    var organizations = collection.find({}, function (err, docsCursor) {
        res.type('application/json');
        if (err) {
            res.status(500);
            res.send({success:false, msg:"Database error"});
            return;
        }
        
        var organizationList = [];
        docsCursor.each(function (err, organization) {
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
                
                organizationList.push(newOrganization);
            } else {
                res.status(200);
                res.json({organizations : organizationList});
            }
        });
    });
}

exports.getOrg = function (req, res) {
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch (e) {
        res.status(500);
        res.send({success:false, msg:"Invalid id"});
        return;
    }
    
    var organizations = collection.findOne({"_id": objID}, function (err, organization) {
        res.type('application/json');
        
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
    });
}

exports.getOrgNearBy = function (req, res) {
    var latitude = req.params.lat;
    var longitude = req.params.long;
    var distance = ((req.params.distance * 1.60934 ) / 6371 ); // distance in miles divided by 3959, in km / 6371
    console.log(distance);
    
    var organizations = collection.find({"latLong":{$near:[parseFloat(latitude), parseFloat(longitude)], $maxDistance: parseFloat(distance)}}, function (err, docsCursor) {
        res.type('application/json');
        if (err) {
            res.status(500);
            res.send({success:false, msg:"Database error."});
            return;
        }
        
        var organizationList = [];
        docsCursor.each(function (err, organization) {
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
                
                organizationList.push(newOrganization);
            } else {
                res.status(200);
                res.json({organizations : organizationList});
            }
        });
    });
}

exports.createOrg = function (req, res) {
    
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
    newOrganization.dateCreated = new Date ().format ( 'c' ); //parseInt(Date.now() / 1000, 10);
    newOrganization.dateLastModified = new Date ().format ( 'c' ); //parseInt(Date.now() / 1000, 10);
    
    // Add possible check feature here around insert
    var organizations = collection.insertOne ( newOrganization, function ( err, returnOrganization ) {
        res.type ( 'application/json' );
        
        if ( returnOrganization != null ) {
            res.status ( 201 );
            res.json ( { success:true, msg: "Organization Created" } );
        } else {
            res.status ( 400 );
            res.json ( { success: false, msg: "Organization creation failed" } );
        }
    });
}

exports.updateOrg = function (req, res) {
    var organization = req.body;
    organization.dateLastModified = new Date().format('c'); //parseInt(Date.now() / 1000, 10);
    
    // Check for valid objectID
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid organization id"});
        return;
    }
    
    var organizations = collection.update({"_id": objID}, {"$set": organization}, function ( err, result ) {
        res.type('application/json');
        
        if ( result == null ) {
            res.status(400);
            res.send({success:false, msg:"Organization update failed"});
            return;
        }
        res.status(200);
        res.json({sucess:true, msg:"Organization updated successfully"});
    });
}

exports.deleteOrg = function (req, res) {
    // Check for valid objectID
    var objID;
    try {
        objID = ObjectID(req.params.id);
    } catch(e) {
        res.status(500);
        res.send({success:false, msg:"Invalid organization id"});
        return;
    }
    
    var organizations = collection.remove({"_id": objID}, function ( err, status ) {
        res.type('application/json');
        
        if (status.result.n == 0) {
            res.status(400);
            res.send({success:false, msg:"Organization deletion failed"});
            return;
        }
        res.status(200);
        res.json({sucess:true, msg:"Organization deletion successful"})
    });
}














