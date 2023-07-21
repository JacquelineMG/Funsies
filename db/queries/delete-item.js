const db = require('../connection');

const deleteTask = (itemId, db) => {
  let queryString = `
  DELETE FROM items
  WHERE id = $1;
  `;
  const queryParams = [itemId];
  return db
    .query(queryString, queryParams)
    .then((data) => {
      data.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { deleteTask };