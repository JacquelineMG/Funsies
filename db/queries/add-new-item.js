const db = require('../connection');

const addNewItem = (item) => {
  const queryString = `
  INSERT INTO items (category_id, title)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const queryParams = [
    item.category_id,
    item.title
  ];
  return db
    .query(queryString, queryParams)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { addNewItem };