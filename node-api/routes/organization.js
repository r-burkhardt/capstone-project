module.exports = function(app) {
    var playerController = require('../controllers/player');
    
    var baseURL = '/services/v1/';
    
    app.get('/services/v1/player', playerController.getAllPlayers);
    app.get('/services/v1/player', playerController.getAllPlayers);
    app.get('/services/v1/player/near/:lat/:long', playerController.getPlayersNear);
    app.post('/services/v1/player/create', playerController.createProfile);
    app.put('/services/v1/player/update', playerController.updateProfile);
    app.delete('/services/v1/player/delete', playerController.delete);
    
    playerController.setDBConnectionsFromApp(app);
}