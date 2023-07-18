/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Get the list
router.get('/', (req, res) => {

});

// Get list by category
router.get('/:category', (req, res) => {

});


// Add new item to list
router.post('/', (req, res) => {

});

// Edit an item
router.post('/:id', (req, res) => {

});

//Delete an item
router.post('/:id/delete', (req, res) => {

});

module.exports = router;
