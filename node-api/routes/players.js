module.exports = function(app) {
    var playersController = require('../controllers/players');

    app.get('/services/v1/players', playersController.getAllPlayers);
    // app.get('/services/v1/players/:id', playersController.getPlayer);
    // app.get('/services/v1/players/near/:lat/:long/:distance', playersController.getPlayersNear);
    // app.post('/services/v1/players/create', playersController.createPlayer);
    // app.put('/services/v1/players/update/:id', playersController.updatePlayer);
    // app.delete('/services/v1/players/delete/:id', playersController.deletePlayer);
    
    playersController.setDBConnectionsFromApp(app);
}