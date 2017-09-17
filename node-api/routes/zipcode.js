module.exports = function(app) {
    var zipcodeController = require('../controllers/players');

    app.get('/services/v1/zipcode', zipcodeController.getAllZipcodes);
    app.get('/services/v1/zipcode/:zip', zipcodeController.getZipcode);
    app.get('/services/v1/zipcode/latlong/:zip', zipcodeController.getLatLong);

    zipcodeController.setDBConnectionsFromApp(app);
}