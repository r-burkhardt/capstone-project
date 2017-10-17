module.exports = function(app) {
    var playerController = require('../controllers/player');

    app.get('/services/v1/player', playerController.getAllPlayer);
    app.get('/services/v1/player/:id', playerController.getPlayer);
    app.get('/services/v1/player/near/:lat/:long/:distance', playerController.getPlayerNearBy);
    app.post('/services/v1/player', playerController.createPlayer);
    app.put('/services/v1/player/:id', playerController.updatePlayer);
    app.delete('/services/v1/player/:id', playerController.deletePlayer);
    
    playerController.setDBConnectionsFromApp(app);
}