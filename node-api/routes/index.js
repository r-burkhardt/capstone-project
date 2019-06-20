// routes/index.js for unified require within the server.

const authenticateRoutes  = require('./authenticate');
const organizationRoutes  = require('./organization');
const playerRoutes        = require('./player');
const userRoutes          = require('./user');
const zipcodeRoutes       = require('./zipcode');

module.exports = ( app ) => {
  // authenticateRoutes( app );
  organizationRoutes( app );
  playerRoutes( app );
  userRoutes( app );
  zipcodeRoutes( app );
}
