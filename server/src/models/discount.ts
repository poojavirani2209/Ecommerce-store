import { Database } from "sqlite3";
import { Item } from "../types/items";

const db = new Database(":memory:");

export const createDiscountCodesTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      ` CREATE TABLE IF NOT EXISTS discount_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            percent INTEGER NOT NULL,
            used INTEGER,
      )
        `,
      (err) => {
        if (err) {
          console.error("Error creating discount codes table:", err.message);
          reject(err);
        } else {
          console.log("Discount codes table created.");
          resolve();
        }
      }
    );
  });
};

export const addNewDiscountCode = (code: string, percent: number) => {
  return new Promise<string>((resolve, reject) => {
    db.run(
      "INSERT INTO discount_codes (code, percent,used) VALUES (?, ?,?)",
      [code, percent, 0],
      (error) => {
        if (error) {
          console.error("Error generating discount code:", error.message);
          reject("Error generating discount code");
        } else {
          console.log(`Discount code ${code} generated`);
          resolve(code);
        }
      }
    );
  });
};

export const getOrderNumber = () => {
  return new Promise<number>((resolve, reject) => {
    db.get("SELECT COUNT(*) as orderCount FROM orders", (err, row) => {
      if (err) {
        console.error("Error fetching order count:", err.message);
        reject("Error fetching order count");
      } else {
        resolve(row.orderCount);
      }
    });
  });
};
