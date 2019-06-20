const ObjectID = require( 'mongodb' ).ObjectID;
let collection;

exports.setDBConnectionsFromApp = (app) => {
  collection = app.get( 'db' ).collection( 'player' );
}

exports.getAllPlayer = (req, res) => {
  res.type( 'application/json' );
  const query = {};

  if ( req.query.count ) {
    collection.count( query, ( err, result ) => {
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
        res.status( 400 );
        res.send( {
          success: false,
          msg: 'Error occurred while accessing database.'
        } );
      } else {
        collection.find( query ).skip( size * ( pageNo - 1 ) ).limit( size ).toArray( ( err, items ) => {
          if ( err ) {
            res.status( 400 );
            res.send( {
              success: false,
              msg: 'An error has occurred.'
            } );
          } else {
            res.status( 200 );
            res.send( {
              success: true,
              count: totalCount,
              pages: pageNo + ' of ' + Math.ceil( totalCount/size ),
              players: items
            } );
          }
        } );
      }
    } );
  }

  // collection.find().toArray( ( err, items ) => {
  //   if ( err ) {
  //     res.status( 400 );
  //     res.send( {
  //       success: false,
  //       msg: 'An error has occurred.'
  //     } );
  //   } else {
  //     res.status( 200 );
  //     res.send( {
  //       success: true,
  //       players: items
  //     } );
  //   }
  // } );


  // var players = collection.find( {}, function (err, docsCursor) {
  //   res.type( 'application/json' );
  //   if ( err ) {
  //     res.status( 500 );
  //     res.send( { success: false, msg: "Database error" } );
  //     return;
  //   }
  //
  //   var playerList = [];
  //   docsCursor.each( function (err, player) {
  //     if ( player != null ) {
  //       var newPlayer = {};
  //       newPlayer.id = player._id;
  //       newPlayer.active = player.active;
  //       newPlayer.firstName = player.firstName;
  //       newPlayer.lastName = player.lastName;
  //       newPlayer.email = player.email;
  //       newPlayer.phone = player.phone;
  //       newPlayer.zipcode = player.zipcode;
  //       newPlayer.latLong = player.latLong;
  //       newPlayer.dateOfBirth = player.dateOfBirth;
  //       newPlayer.height = player.height;
  //       newPlayer.yearsPlay = player.yearsPlay;
  //       // Loop through injuries to add to injury item
  //       // var i;
  //       // var injuryList = [];
  //       // for ( i = 0; i < player.injuries.length; i++ ) {
  //       //   injuryList.push( player.injuries[i] );
  //       // }
  //       newPlayer.injuries = player.injuries;
  //       newPlayer.pointAvg = player.pointAvg;
  //       newPlayer.profilePic = player.profilePic;
  //       // Player ranking
  //       newPlayer.totalRank = player.totalRank;
  //       // newPlayer.ageRank = player.ageRank;
  //       // newPlayer.heightRank = player.heightRank;
  //       // newPlayer.yrsPlayRank = player.yrsPlayRank;
  //       // newPlayer.skillRank = player.skillRank;
  //       // newPlayer.injuryRank = player.injuryRank;
  //       // Player modifications
  //       newPlayer.dateCreated = player.dateCreated;
  //       newPlayer.dateLastModified = player.dateLastModified;
  //
  //       // console.log((new Date() - new Date(player.dateOfBirth))/1000/60/60/24/365);
  //
  //       playerList.push( newPlayer );
  //     } else {
  //       res.status( 200 );
  //       res.json( { players: playerList } );
  //     }
  //   } );
  // } );
}

exports.getPlayer = (req, res) => {
  res.type( 'application/json' );

  let objID;
  try {
    objID = { "_id": ObjectID( req.params.id ) };
  } catch ( e ) {
    res.status( 500 );
    res.send( {
      success: false,
      msg: 'An error has occurred',
      error: e
    } );
  }

  collection.findOne( objID, (err, player) => {

    if ( err ) {
      res.status( 400 );
      res.send( {
        success: false,
        msg: 'Database error.'
      } );
    } else if ( !player ) {
      res.status( 404 );
      res.send( {
        success: false,
        msg: 'Player not found'
      } );
    } else {
      res.status( 200 );
      res.send( {
        success: true,
        msg: 'Player found.',
        player: player
      } );
    }
  } );
}

exports.getPlayerNearBy = (req, res) => {
  res.type( 'application/json' );

  const latitude = req.params.lat;
  const longitude = req.params.long;
  const distance = ((req.params.distance * 1.60934) / 3959); // distance in miles divided by 3959, in km / 6371
  // console.log( distance );

  collection.find( {
    "latLong": {
      $near: [ parseFloat( latitude ), parseFloat( longitude ) ],
      $maxDistance: parseFloat( distance )
    }
  } ).toArray( ( err, players ) => {

    if ( err ) {
      res.status( 500 );
      res.send( {
        success: false,
        msg: "Database error."
      } );
    } else {
      res.status( 200 );
      res.send( {
        success: true,
        msg: 'Search successful.',
        players: players
      } );
    }
  } );
}

exports.createPlayer = (req, res) => {
  res.type( 'application/json' );

  const player = req.body;

  if ( !player.lastName || !player.firstName || !player.email || !player.zipcode ) {
    res.status( 400 );
    res.send( {
      success: false,
      msg: 'Required DATA missing, check API document and try again.'
    } );
  } else {
    if ( !player.active ) player.active = true;
    player.active = (typeof player.active === 'string') ? (player.active === 'true') : player.active;
    if ( player.phone ) {
      player.phone = (typeof player.phone === 'string') ? parseInt( player.phone, 10 ) : player.phone;
    }
    player.dateCreated = new Date().format( 'r' );

    collection.insertOne( player, (err, result) => {
      if ( err ) {
        res.status( 400 );
        res.send( {
          success: false,
          msg: 'An error has occurred while creating player.'
        } );
      } else {
        res.status( 201 );
        res.send( {
          success: true,
          msg: 'Player created',
          player: result.ops[0]
        } );
      }

    } );
  }

  // Player ranking
  // newPlayer.totalRank = player.totalRank;
  // newPlayer.ageRank = player.ageRank;
  // newPlayer.heightRank = player.heightRank;
  // newPlayer.yrsPlayRank = player.yrsPlayRank;
  // newPlayer.skillRank = player.skillRank;
  // newPlayer.injuryRank = player.injuryRank;
}

exports.updatePlayer = (req, res) => {
  res.type('application/json');

  let player = req.body;

  // Check for valid objectID
  let objID;
  try {
    objID = { '_id': new ObjectID( req.params.id ) };
  } catch ( e ) {
    res.status( 500 );
    res.send( {
      success: false,
      msg: 'An error has occurred',
      error: e
    } );
  }

  if ( player._id ) delete  player._id;
  player.active = (typeof player.active === 'string') ? (player.active === 'true') : player.active;
  if ( player.phone ) {
    player.phone = (typeof player.phone === 'string') ? parseInt( player.phone, 10 ) : player.phone;
  }
  player.dateLastModified = new Date().format( 'r' );

  collection.updateOne( objID, { '$set': player }, ( err, result ) => {
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
        msg: 'Player not found.'
      } )
    } else {
      res.status( 202 );
      res.send( {
        success: true,
        msg: 'Player updated successfully.'
      } );
    }
  } );

  //
  // var players = collection.update( { "_id": objID }, { "$set": player }, function (err, result) {
  //   res.type( 'application/json' );
  //
  //   if ( result == null ) {
  //     res.status( 400 );
  //     res.send( { success: false, msg: "Player update failed" } );
  //     return;
  //   }
  //   res.status( 200 );
  //   res.json( { sucess: true, msg: "Player updated successfully" } );
  // } );
}

exports.deletePlayer = (req, res) => {
  res.type( 'application/json' );

  let objID;
  try {
    objID = { '_id': ObjectID( req.params.id ) };
  } catch ( e ) {
    res.status( 500 );
    res.send( {
      success: false,
      msg: 'Invalid player id.'
    } );
  }

  collection.remove( objID, (err, status) => {

    if ( status.result.n === 0 ) {
      res.status( 400 );
      res.send( {
        success: false,
        msg: 'Player deletion failed.'
      } );
    } else {
      res.status( 200 );
      res.json( {
        success: true,
        msg: 'Player deletion successful.'
      } );
    }
  } );
}














