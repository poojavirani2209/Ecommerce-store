import { Database } from "sqlite3";

const db = new Database(":memory:");

export const createCartTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
            CREATE TABLE IF NOT EXISTS cart (
                id TEXT PRIMARY KEY,
                itemId TEXT
                FOREIGN KEY(itemId) REFERENCES items(id)
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

export const addItemToCart = (cartId: string, itemId: string) => {
  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO cart (id, itemId) VALUES (?, ?)`,
      [cartId, itemId],
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

export const getItemsByCartId = (cartId: string): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    db.run(
      `SELECT itemId FROM cart Where id LIKE ${cartId}`,
      (err: any, items: string[]) => {
        if (err) {
          console.error("Error getting items from cart:", err.message);
          reject(err);
        } else {
          resolve(items);
        }
      }
    );
  });
};
