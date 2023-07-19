SELECT title FROM items
JOIN categories ON categories.id = category_id
WHERE category_name = 'watch';