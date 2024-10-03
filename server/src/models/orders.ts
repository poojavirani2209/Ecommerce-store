import { Database } from "sqlite3";
import { Item } from "../types/items";

const db = new Database(":memory:");

export const createOrdersTable = () : Promise<void> => {
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
          } else {
            console.log('Order table created.');
            resolve();
          }
        });
              });
};

export const getAllOrders = (): Promise<Item[]> => {
  return new Promise<Item[]>((resolve, reject) => {
    db.all(`SELECT * FROM orders`, [], (err: any, orders: Item[]) => {
      if (err) {
        console.error("Error fetching orders:", err.message);
        reject(err);
      } else {
        resolve(orders);
      }
    });
  });
};

export const addNewOrder= (orderId:string,userId:string,items: Item[]) => {
    return new Promise<void>((resolve, reject) => {
      db.run(
        `INSERT INTO orders (id,userId,items) VALUES (?, ?,?)`,
        [orderId,userId,JSON.stringify(items)],
        (err) => {
          if (err) {
            console.error("Error inserting order:", err.message);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  };
  