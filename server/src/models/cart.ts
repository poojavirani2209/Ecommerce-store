import { Database } from "sqlite3";
import { Item } from "../types/items";
import { Cart } from "../types/cart";

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
    db.all(`SELECT * FROM cart`, [], (err: any, rows: any) => {
      if (err) {
        console.error("Error fetching cart details:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getItemsByCartId = (cartId: string): Promise<Item[]> => {
  return new Promise<Item[]>((resolve, reject) => {
    db.all(
      `SELECT * FROM cart WHERE id = ?`, 
      [cartId], 
      (err: any, cartDetails: Cart) => {
        if (err) {
          console.error("Error fetching item:", err.message);
          reject(err);
        } else {
          if(cartDetails[0]){
            resolve(JSON.parse(cartDetails[0].items)); 
          }else{
            resolve([]);
          }
        }
      }
    );
  });
};
export const deleteCart = (cartId) => {
  return new Promise<void>((resolve, reject) => {
    db.all(
      `DELETE FROM cart WHERE id = ?`, 
      [cartId], 
      (err: any) => {
        if (err) {
          console.error("Error fetching item:", err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
