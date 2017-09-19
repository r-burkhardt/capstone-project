module.exports = function(app) {
    var zipcodeController = require('../controllers/zipcodes');

    app.get('/services/v1/zipcodes', zipcodeController.getAllZipcodes);
    app.get('/services/v1/zipcodes/:zip', zipcodeController.getZipcode);
    app.get('/services/v1/zipcodes/latlong/:zip', zipcodeController.getLatLong);

    zipcodeController.setDBConnectionsFromApp(app);
}