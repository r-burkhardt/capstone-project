module.exports = function(app) {
    var usersController = require('../controllers/users');

    app.get('/services/v1/users', usersController.getAllUsers);
    app.get('/services/v1/users/:id', usersController.getUser);
    app.post('/services/v1/users/create', usersController.createUser);
    app.put('/services/v1/users/update/:id', usersController.updateUser);
    app.delete('/services/v1/users/delete/:id', usersController.deleteUser);
    
    usersController.setDBConnectionsFromApp(app);
}