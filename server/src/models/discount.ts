import { Database } from "sqlite3";
import { Discount, DiscountCodeStatus } from "../types/discount";

const db = new Database(":memory:");

export const createDiscountCodesTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      ` CREATE TABLE IF NOT EXISTS discount_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            percent INTEGER NOT NULL,
            status TEXT
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
      "INSERT INTO discount_codes (code, percent,status) VALUES (?, ?,?)",
      [code, percent, DiscountCodeStatus.AVAILABLE],
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

export const updateDiscountStatus = (
  discount: Discount,
  newStatus: DiscountCodeStatus
) => {
  return new Promise<DiscountCodeStatus>((resolve, reject) => {
    db.run(
      "INSERT or REPLACE INTO discount_codes (id, code, percent,status) VALUES (?, ?, ?, ?)",
      [discount.id, discount.code, discount.percent, newStatus],
      (error) => {
        if (error) {
          console.error("Error updating discount status:", error.message);
          reject("Error updating discount status");
        } else {
          console.log(`Discount status updated`);
          resolve(newStatus);
        }
      }
    );
  });
};

export const getDiscountByCode = async (discountCode: string) => {
  return new Promise<Discount>(async (resolve, reject) => {
    db.get(
      "SELECT * FROM discount_codes WHERE code = ?",
      [discountCode],
      (err, discount: Discount) => {
        if (err) {
          console.error("Error fetching discount", err.message);
          reject("Error fetching discount");
        }
        resolve(discount);
      }
    );
  });
};
