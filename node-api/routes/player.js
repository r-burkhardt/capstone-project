module.exports = function(app) {
    var playersController = require('../controllers/players');

    app.get('/services/v1/player', playersController.getAllPlayers);
    app.get('/services/v1/player/:id', playersController.getPlayer);
    app.get('/services/v1/player/near/:lat/:long/:distance', playersController.getPlayersNear);
    app.post('/services/v1/player/create', playersController.createPlayer);
    app.put('/services/v1/player/update/:id', playersController.updatePlayer);
    app.delete('/services/v1/player/delete/:id', playersController.deletePlayer);
    
    playersController.setDBConnectionsFromApp(app);
}