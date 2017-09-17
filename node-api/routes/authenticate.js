module.exports = function(app) {
    var authenticateController = require('../controllers/authenticate');

    app.post('/services/v1/authenticate', authenticateController.authorize); // Verify login

    authenticateController.setDBConnectionsFromApp(app);
}