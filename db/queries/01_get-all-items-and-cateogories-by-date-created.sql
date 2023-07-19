SELECT items.title, category_name, items.created_date, is_done
FROM items
LEFT JOIN categories ON categories.id = items.category_id
ORDER BY created_date;