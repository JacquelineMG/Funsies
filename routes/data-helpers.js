const db = require('../db/connection.js');

// gets all items from database
const getAllItems = function() {
  const queryString = `
    SELECT * FROM items
    ORDER BY created_date;
    `;
  return db
    .query(queryString)
    .then(data => {
      if (!data.rows.length) {
        return null;
      }
      return data.rows;
    })
    .catch((err) => {
      console.error(err);
    });
};

// get list by category
const getListByCategory = function(categoryId) {
  const queryString = `
  SELECT * FROM items
  WHERE category_id = $1
  ORDER BY created_date;
  `;
  const values = [categoryId];
  return db
    .query(queryString, values)
    .then((data) => {
      if (!data.rows.length) {
        return null;
      }
      return data.rows;
    })
    .catch((err) => {
      console.error(err);
    });
};

// adds new item to db
const addNewItem = async(categoryId, title) => {
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

// edit item category and completion
const editItemCategory = (categoryId, itemId, status) => {
  let queryString = `
  UPDATE items
  SET`;
  const queryParams = [];

  if (categoryId) {
    queryParams.push(categoryId);
    queryString += ` category_id = $${queryParams.length},`;
  }

  if (status) {
    queryParams.push(status);
    queryString += ` is_done = $${queryParams.length},`;
  }

  // remove comma if either categoryId or status is truthy
  if (categoryId || status) {
    queryString = queryString.slice(0, -1);
  }

  queryParams.push(itemId);
  queryString += ` WHERE id = $${queryParams.length} RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete item from db
const deleteTask = (itemId) => {
  let queryString = `
  DELETE FROM items
  WHERE id = $1
  RETURNING *;
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
  getListByCategory,
  addNewItem,
  editItemCategory,
  deleteTask
};
