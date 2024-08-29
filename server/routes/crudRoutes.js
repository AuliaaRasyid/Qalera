const express = require('express');
const router = express.Router();
const crudController = require('../controller/crudController');

/**
 * Creates reusable routes for CRUD operations on an entity.
 * @param {string} entityName - The name of the entity (e.g., 'partner', 'team').
 * @param {Function} uploadMiddleware - Middleware for handling file uploads, if any.
 * @param {Object} crudController - An object containing CRUD operation handlers.
 */
const createRoutes = (entityName, uploadMiddleware, crudController) => {
    /**
     * Middleware function to apply upload middleware if provided.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    const applyMiddleware = (req, res, next) => {
        if (uploadMiddleware) {
            uploadMiddleware(req, res, next);
        } else {
            next();
        }
    };

    // Route to add a new item
    router.post(`/${entityName}`, (req, res, next) => {
        next();  // Proceed to the next middleware or handler
    }, applyMiddleware, crudController.addItem);

    // Route to get all items
    router.get(`/${entityName}`, (req, res, next) => {
        next();  // Proceed to the next middleware or handler
    }, crudController.getAllItems);

    // Route to get an item by its ID
    router.get(`/${entityName}/:id`, (req, res, next) => {
        next();  // Proceed to the next middleware or handler
    }, crudController.getItemById);

    // Route to update an item by its ID
    router.put(`/${entityName}/:id`, (req, res, next) => {
        next();  // Proceed to the next middleware or handler
    }, applyMiddleware, crudController.editItem);

    // Route to delete an item by its ID
    router.delete(`/${entityName}/:id`, (req, res, next) => {
        next();  // Proceed to the next middleware or handler
    }, crudController.deleteItem);
};

// Create routes for partners
createRoutes('partner', crudController.partner.uploadImage, {
    addItem: crudController.partner.addItem,
    getAllItems: crudController.partner.getAllItems,
    getItemById: crudController.partner.getItemById,
    editItem: crudController.partner.editItem,
    deleteItem: crudController.partner.deleteItem,
});

// Create routes for team
createRoutes('team', crudController.team.uploadImage, {
    addItem: crudController.team.addItem,
    getAllItems: crudController.team.getAllItems,
    getItemById: crudController.team.getItemById,
    editItem: crudController.team.editItem,
    deleteItem: crudController.team.deleteItem,
});

// Create routes for testimonials (testimoni)
createRoutes('testimoni', undefined, {
    addItem: crudController.testimoni.addItem,
    getAllItems: crudController.testimoni.getAllItems,
    getItemById: crudController.testimoni.getItemById,
    editItem: crudController.testimoni.editItem,
    deleteItem: crudController.testimoni.deleteItem,
});

// Create routes for career
createRoutes('career', crudController.career.uploadPDF, {
    addItem: crudController.career.addItem,
    getAllItems: crudController.career.getAllItems,
    getItemById: crudController.career.getItemById,
    editItem: crudController.career.editItem,
    deleteItem: crudController.career.deleteItem,
});

// Create routes for products
createRoutes('product', crudController.product.uploadImage, {
    addItem: crudController.product.addItem,
    getAllItems: crudController.product.getAllItems,
    getItemById: crudController.product.getItemById,
    editItem: crudController.product.editItem,
    deleteItem: crudController.product.deleteItem,
});

// Create routes for appliers
createRoutes('applier', crudController.applier.uploadPDF, {
    addItem: crudController.applier.addItem,
    getAllItems: crudController.applier.getAllItems,
    getItemById: crudController.applier.getItemById,
    editItem: crudController.applier.editItem,
    deleteItem: crudController.applier.deleteItem,
});

module.exports = router;