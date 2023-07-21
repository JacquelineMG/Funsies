const db = require('../connection');

const getAllItems = () => {
  const queryString = `
    SELECT items.title, category_name, items.created_date, is_done
    FROM items
    LEFT JOIN categories ON categories.id = items.category_id
    ORDER BY created_date;
    `;
  return db
    .query(queryString)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getAllItems };