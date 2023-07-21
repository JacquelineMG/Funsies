const db = require("../db/connection");

// gets all items from database
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

// adds new item to db
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

// edit item category
const editItemCategory = (categoryId, itemId) => {
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

// delete item from db
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

module.exports = {
  getAllItems,
  addNewItem,
  editItemCategory,
  deleteTask
};