const ObjectID = require( 'mongodb' ).ObjectID;
let collection;

exports.setDBConnectionsFromApp = ( app ) => {
  collection = app.get( 'db' ).collection( 'organization' );
}

exports.getAllOrg = (req, res) => {
  res.type( 'application/json' );
  const query = {};

  if ( req.query.count ) {
    collection.count( query, (err, results) => {
      if ( err ) {
        res.status( 400 );
        res.send( {
          success: false,
          msg: 'An error has occurred',
          error: err
        } );
      } else {
        res.status( 200 );
        res.send( {
          success: true,
          count: result
        } );
      }
    } );
  } else {
    if ( req.query.pageNo && parseInt( req.query.pageNo ) < 1 ) {
      res.status( 400 );
      res.send( {
        success: false,
        msg: "Invalid page number, should start with 1."
      } );
    }
    let pageNo = ( req.query.pageNo ) ? parseInt( req.query.pageNo ) : 1;
    let size = ( req.query.size ) ? parseInt( req.query.size ) : 250;

    collection.count( query, ( err, totalCount ) => {
      if ( err ) {
        res.status( 500 );
        res.send( {
          success: false,
          msg: "Database error"
        } );
      } else {
        collection.find( query ).skip( size * ( pageNo - 1 ) ).limit( size ).toArray( (err, items) => {
          if ( err ) {
            res.status( 400 );
            res.send( {
              success: false,
              msg: 'an error has occurred'
            } );
          } else {
            res.status( 200 );
            res.send( {
              success: true,
              count: totalCount,
              pages: pageNo + ' of ' + Math.ceil( totalCount/size ),
              organizations: items
            } );
          }
        } );
      }
    } );
  }
}

exports.getOrg = (req, res) => {
  res.type( 'application/json' );

  let objID;
  try {
    objID = { "_id": ObjectID( req.params.id ) };
  } catch ( e ) {
    res.status( 500 );
    res.send( {
      success: false,
      msg: "Invalid id",
      error: e
    } );
  }

  collection.findOne( objID, (err, organization) => {

    if (err ) {
      res.status( 500 );
      res.send( {
        success: false,
        msg: 'Database error.'
      } );
    } else if (!organization) {
      res.status( 404 );
      res.send( {
        success: false,
        msg: 'Organization not found'
      } );
    } else {
      res.status( 200 );
      res.send( {
        success: false,
        msg: 'Organization found',
        organization: organization
      } );
    }
  } );
}

exports.getOrgNearBy = (req, res) => {
  res.type( 'application/json' );

  const latitude = req.params.lat;
  const longitude = req.params.long;
  const distance = req.params.distance; //((req.params.distance * 1.60934 ) / 6371 ); // distance in miles divided by
                                      // 3959, in km / 6371
  // console.log(distance);

  // collection.find({"latLong":{$near:[parseFloat(latitude), parseFloat(longitude)], $maxDistance:
  // parseFloat(distance)}}, function (err, docsCursor) { collection.find({"latLong":{$near:[parseFloat(latitude),
  // parseFloat(longitude)]}}, function (err, docsCursor) {

  collection.find( { loc: { $geoWithin: { $centerSphere: [ [ parseFloat( latitude ), parseFloat( longitude ) ], distance / 3963.2 ] } } } ).toArray( ( err, organizations ) => {
    if ( err ) {
      res.status( 500 );
      res.send( {
        success: false,
        msg: "Database error."
      } );
    } else {
      res.status( 200 );
      res.json( {
        success: true,
        msg: 'Search successful.',
        organizations: organizations
      } );
    }
  } );
}

exports.createOrg = (req, res) => {
  res.type( 'application/json' );

  const organization = req.body;

  if ( !organization.name || !organization.street || !organization.zipcode || !organization.latLong || organization.email ) {
    res.status( 400 );
    res.send( {
      success: false,
      msg: 'Required DATA missing, check API document and try again.'
    } );
  } else {
    if ( organization.phone ) {
      organization.phone = ( typeof organization.phone === 'string' ) ? parseInt( organization.phone, 10 ) : organization.phone;
    }
    organization.dateCreated = new Date().format( 'r' );

    // Add possible check feature here around insert
    collection.insertOne( organization, (err, result) => {
      if ( err ) {
        res.status( 400 );
        res.send( {
          success: false,
          msg: 'An error has occurred while creating organization.'
        } );
      } else {
        res.status( 201 );
        res.send( {
          success: true,
          msg: 'Organization created',
          organization: result.op[0]
        } );
      }
    } );
  }
}

exports.updateOrg = (req, res) => {
  res.type( 'application/json' );

  const organization = req.body;

  let objID;
  try {
    objID = { '_id': ObjectID( req.params.id ) };
  } catch ( e ) {
    res.status( 500 );
    res.send( {
      success: false,
      msg: 'An error has occurred',
      error: e
    } );
  }

  if ( organization.phone ) {
    organization.phone = ( typeof organization.phone === 'string' ) ? parseInt( organization.phone, 10 ) : organization.phone;
  }
  organization.dateLastModified = new Date().format( 'r' );

  collection.update( objID, { "$set": organization }, (err, result) => {
    if ( err ) {
      res.status( 400 );
      res.send( {
        success: false,
        msg: 'An error has occurred.'
      } );
    } else if ( result.modifiedCount === 0 ) {
      res.status( 404 );
      res.send( {
        success: false,
        msg: 'Organization not found.'
      } );
    } else {
      res.status( 202 );
      res.send( {
        success: true,
        msg: 'Organization update successfully.'
      } );
    }
  } );
}

exports.deleteOrg = (req, res) => {
  res.type( 'application/json' );

  let objID;
  try {
    objID = { '_id': ObjectID( req.params.id ) };
  } catch ( e ) {
    res.status( 500 );
    res.send( {
      success: false,
      msg: 'Invalid organization id.'
    } );
  }

  collection.remove( objID, (err, status) => {

    if ( status.result.n === 0 ) {
      res.status( 400 );
      res.send( {
        success: false,
        msg: 'Organization deletion failed.'
      } );
    } else {
      res.status( 200 );
      res.send( {
        success: true,
        msg: 'Organization deletion successful.'
      } );
    }
  } );
}














