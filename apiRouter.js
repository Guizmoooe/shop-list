// Imports
const express = require('express');
const usersCtrl = require('./routes/users');
const ingredientsCtrl = require('./routes/ingredients');

// Router
exports.router = (function () {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/delete/').post(usersCtrl.delete);

    // Ingredients routes
    apiRouter.route('/ingredients/').get(ingredientsCtrl.getAll);
    //apiRouter.route('/ingredient/').get(ingredientsCtrl.getById);
    apiRouter.route('/ingredients/').post(ingredientsCtrl.save);
    //apiRouter.route('/ingredients/').post(ingredientsCtrl.delete);

    return apiRouter;
})();
