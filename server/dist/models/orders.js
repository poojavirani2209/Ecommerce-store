"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewOrder = exports.getAllOrders = exports.createOrdersTable = void 0;
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database(":memory:");
const createOrdersTable = () => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                userId TEXT,
                items TEXT
                )
        `, (err) => {
            if (err) {
                console.error('Error creating orders table:', err.message);
                reject(err);
            }
            else {
                console.log('Order table created.');
                resolve();
            }
        });
    });
};
exports.createOrdersTable = createOrdersTable;
const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM orders`, [], (err, orders) => {
            if (err) {
                console.error("Error fetching orders:", err.message);
                reject(err);
            }
            else {
                resolve(orders);
            }
        });
    });
};
exports.getAllOrders = getAllOrders;
const addNewOrder = (orderId, userId, items) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO orders (id,userId,items) VALUES (?, ?,?)`, [orderId, userId, JSON.stringify(items)], (err) => {
            if (err) {
                console.error("Error inserting order:", err.message);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.addNewOrder = addNewOrder;
//# sourceMappingURL=orders.js.map