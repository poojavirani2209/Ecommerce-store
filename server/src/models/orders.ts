import { Database } from "sqlite3";
import { Item } from "../types/items";
import { Order } from "../types/order";

const db = new Database(":memory:");

export const createOrdersTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                userId TEXT,
                items TEXT,
                discountAmount TEXT
                )
        `,
      (err) => {
        if (err) {
          console.error("Error creating orders table:", err.message);
          reject(err);
        } else {
          console.log("Order table created.");
          resolve();
        }
      }
    );
  });
};

export const getAllOrders = (): Promise<Order[]> => {
  return new Promise<Order[]>((resolve, reject) => {
    db.all(`SELECT * FROM orders`, [], (err: any, orders: Order[]) => {
      if (err) {
        console.error("Error fetching orders:", err.message);
        reject(err);
      } else {
        resolve(orders);
      }
    });
  });
};

export const addNewOrder = (
  orderId: string,
  userId: string,
  items: Item[],
  discountAmount: number
) => {
  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO orders (id,userId,items, discountAmount) VALUES (?, ?, ?,?)`,
      [orderId, userId, JSON.stringify(items), discountAmount],
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

export const getOrderNumber = () => {
  return new Promise<number>((resolve, reject) => {
    db.get("SELECT COUNT(*) as orderCount FROM orders", (err, row: any) => {
      if (err) {
        console.error("Error fetching order count:", err.message);
        reject(err);
      } else {
        resolve(row.orderCount);
      }
    });
  });
};
