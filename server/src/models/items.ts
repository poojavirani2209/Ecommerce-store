import { Database } from "sqlite3";
import { Item } from "../types/items";

const db = new Database(":memory:");

export const createItemsTable = () : Promise<void> => {
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
          } else {
            console.log('Items table created.');
            resolve();
          }
        });
        
        // Additional table creation logic can go here
      });
};


export const addNewItem = (item: Item) => {
  return new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT INTO items (id, name, price, category) VALUES (?, ?, ?, ?)`,
      [item.id, item.name, item.price, item.category],
      (err) => {
        if (err) {
          console.error("Error inserting item:", err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export const getAllItems = (): Promise<Item[]> => {
  return new Promise<Item[]>((resolve, reject) => {
    db.all(`SELECT * FROM items`, [], (err: any, items: Item[]) => {
      if (err) {
        console.error("Error fetching items:", err.message);
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
};

export const getItemById = (id:string): Promise<Item> => {
  return new Promise<Item>((resolve, reject) => {
    db.all(`SELECT * FROM items Where id like ${id}`, [], (err: any, item: Item) => {
      if (err) {
        console.error("Error fetching item:", err.message);
        reject(err);
      } else {
        resolve(item);
      }
    });
  });
};
