module.exports = function(app) {
    var userController = require('../controllers/user');

    app.get('/services/v1/user', userController.getAllUser);
    app.get('/services/v1/user/:id', userController.getUser);
    app.post('/services/v1/user', userController.createUser);
    app.put('/services/v1/user/:id', userController.updateUser);
    app.delete('/services/v1/user/:id', userController.deleteUser);
    
    userController.setDBConnectionsFromApp(app);
}