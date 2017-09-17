module.exports = function(app) {
    var organizationController = require('../controllers/organizations');

    app.get('/services/v1/org', organizationController.getAllOrgs);
    app.get('/services/v1/org/:id', organizationController.getOrg);
    app.get('/services/v1/org/near/:lat/:long/:distance', organizationController.getOrgNear);
    app.post('/services/v1/org/create', organizationController.createOrg);
    app.put('/services/v1/org/update/:id', organizationController.updateOrg);
    app.delete('/services/v1/org/delete/:id', organizationController.deleteOrg);
    
    organizationController.setDBConnectionsFromApp(app);
}