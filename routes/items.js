/*
 * All routes for items are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const itemsQueries = require('../db/queries/get-all-items');

// get all items
router.get("/", (req, res) => {
  itemsQueries
    .getAllItems(req.query)
    .then(items => {
      res.send(items);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});


module.exports = router;