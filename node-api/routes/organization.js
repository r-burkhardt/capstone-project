module.exports = function(app) {
    var organizationController = require('../controllers/organization');

    app.get('/services/v1/org', organizationController.getAllOrg);
    app.get('/services/v1/org/:id', organizationController.getOrg);
    app.get('/services/v1/org/:lat/:long/:distance', organizationController.getOrgNearBy);
    app.post('/services/v1/org', organizationController.createOrg);
    app.put('/services/v1/org/:id', organizationController.updateOrg);
    // app.delete('/services/v1/org/:id', organizationController.deleteOrg);
    
    organizationController.setDBConnectionsFromApp(app);
}