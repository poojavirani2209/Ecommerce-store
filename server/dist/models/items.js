"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemById = exports.getAllItems = exports.addNewItem = exports.createItemsTable = void 0;
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database(":memory:");
const createItemsTable = () => {
    return new Promise((resolve, reject) => {
        db.run(`
          CREATE TABLE IF NOT EXISTS items (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL
          )
        `, (err) => {
            if (err) {
                console.error('Error creating items table:', err.message);
                reject(err);
            }
            else {
                console.log('Items table created.');
                resolve();
            }
        });
        // Additional table creation logic can go here
    });
};
exports.createItemsTable = createItemsTable;
const addNewItem = (item) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO items (id, name, price, category) VALUES (?, ?, ?, ?)`, [item.id, item.name, item.price, item.category], (err) => {
            if (err) {
                console.error("Error inserting item:", err.message);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.addNewItem = addNewItem;
const getAllItems = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM items`, [], (err, items) => {
            if (err) {
                console.error("Error fetching items:", err.message);
                reject(err);
            }
            else {
                resolve(items);
            }
        });
    });
};
exports.getAllItems = getAllItems;
const getItemById = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM items Where id like ${id}`, [], (err, item) => {
            if (err) {
                console.error("Error fetching item:", err.message);
                reject(err);
            }
            else {
                resolve(item);
            }
        });
    });
};
exports.getItemById = getItemById;
//# sourceMappingURL=items.js.map