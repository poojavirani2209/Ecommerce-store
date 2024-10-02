"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.getItemsByCartId = exports.getAllCartDetails = exports.addItemToCart = exports.createCartTable = void 0;
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database(":memory:");
const createCartTable = () => {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS cart (
                id TEXT PRIMARY KEY,
                items TEXT
                )
        `, (err) => {
            if (err) {
                console.error("Error creating cart table:", err.message);
                reject(err);
            }
            else {
                console.log("Cart table created.");
                resolve();
            }
        });
    });
};
exports.createCartTable = createCartTable;
const addItemToCart = (cartId, items) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT or REPLACE INTO cart (id, items) VALUES (?, ?)`, [cartId, JSON.stringify(items)], (err) => {
            if (err) {
                console.error("Error inserting item into cart:", err.message);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.addItemToCart = addItemToCart;
const getAllCartDetails = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM cart`, [], (err, rows) => {
            if (err) {
                console.error("Error fetching cart details:", err.message);
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
exports.getAllCartDetails = getAllCartDetails;
const getItemsByCartId = (cartId) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM cart WHERE id = ?`, // Use parameterized query
        [cartId], // Pass cartId as a parameter
        (err, cartDetails) => {
            // Expect rows (an array of items)
            if (err) {
                console.error("Error fetching item:", err.message);
                reject(err);
            }
            else {
                resolve(JSON.parse(cartDetails[0].items)); // Return the array of rows directly
            }
        });
    });
};
exports.getItemsByCartId = getItemsByCartId;
const deleteCart = (cartId) => {
    return new Promise((resolve, reject) => {
        db.all(`DELETE FROM cart WHERE id = ?`, // Use parameterized query
        [cartId], // Pass cartId as a parameter
        (err, cartDetails) => {
            // Expect rows (an array of items)
            if (err) {
                console.error("Error fetching item:", err.message);
                reject(err);
            }
            else {
                resolve(); // Return the array of rows directly
            }
        });
    });
};
exports.deleteCart = deleteCart;
//# sourceMappingURL=cart.js.map