module.exports = function(app) {
    var userController = require('../controllers/user');

    app.get('/services/v1/user', userController.getAllUser);
    app.get('/services/v1/user/:id', userController.getUser);
    app.post('/services/v1/user/create', userController.createUser);
    app.put('/services/v1/user/update/:id', userController.updateUser);
    app.delete('/services/v1/user/delete/:id', userController.deleteUser);
    
    userController.setDBConnectionsFromApp(app);
}