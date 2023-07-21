const db = require('../connection');

const editItemCategory = (categoryId, itemId, db) => {
  let queryString = `
  UPDATE items SET `;
  const queryParams = [];

  if (categoryId) {
    queryParams.push(categoryId);
    queryString += `category = $${queryParams.length}`;
  }

  queryParams.push(itemId);
  queryString += `WHERE id = $${queryParams.length} RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then((data) => {
      data.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { editItemCategory };