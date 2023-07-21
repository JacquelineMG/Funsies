const db = require('../connection');

const addNewItem = (categoryId, title) => {
  const queryString = `
  INSERT INTO items (category_id, title)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const queryParams = [
    categoryId, title
  ];
  return db
    .query(queryString, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { addNewItem };