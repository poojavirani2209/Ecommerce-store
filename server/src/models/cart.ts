import { Database } from "sqlite3";
import { Item } from "../types/items";

const db = new Database(":memory:");

export const createCartTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
            CREATE TABLE IF NOT EXISTS cart (
                id TEXT PRIMARY KEY,
                items TEXT
                )
        `,
      (err) => {
        if (err) {
          console.error("Error creating cart table:", err.message);
          reject(err);
        } else {
          console.log("Cart table created.");
          resolve();
        }
      }
    );
  });
};

export const addItemToCart = (cartId: string, items: Item[]) => {
  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT or REPLACE INTO cart (id, items) VALUES (?, ?)`,
      [cartId, JSON.stringify(items)],
      (err) => {
        if (err) {
          console.error("Error inserting item into cart:", err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const getAllCartDetails = (): Promise<Item[]> => {
  return new Promise<Item[]>((resolve, reject) => {
    db.all(`SELECT * FROM cart`, [], (err: any, rows:any) => {
      if (err) {
        console.error("Error fetching cart details:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getItemsByCartId = (cartId: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    db.all(`SELECT * FROM cart Where id like ${cartId}`, [], (err: any, item: string) => {
      if (err) {
        console.error("Error fetching item:", err.message);
        reject(err);
      } else {
        resolve(item);
      }
    });
  });
};
