import sqlite3 from 'sqlite3';
import { createItemsTable } from '../models/items';
import { initialize } from '../controllers/itemController';

// Initialize SQLite connection
let db: sqlite3.Database;

export const connectDB = () => {
  db = new sqlite3.Database(':memory:',async  (err) => {
    if (err) {
      console.error('Error opening SQLite database:', err.message);
      throw new Error('Error')
    } else {
      console.log('Connected to SQLite in-memory database.');
      await initializeTables();
    }
  });
};

export const closeDB = () => {
    db.close((err) => {
      if (err) {
        console.error('Error closing SQLite database:', err.message);
        throw new Error('Error')
      } else {
        console.log('Closed SQLite database.');
      }
    });
  };

const initializeTables = async() => {
    await createItemsTable();
    initialize();
};