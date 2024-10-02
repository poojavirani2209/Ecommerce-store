"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.connectDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const items_1 = require("../models/items");
const itemController_1 = require("../controllers/itemController");
const cart_1 = require("../models/cart");
const orders_1 = require("../models/orders");
// Initialize SQLite connection
let db;
const connectDB = () => {
    db = new sqlite3_1.default.Database(':memory:', (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('Error opening SQLite database:', err.message);
            throw new Error('Error');
        }
        else {
            console.log('Connected to SQLite in-memory database.');
            yield initializeTables();
        }
    }));
};
exports.connectDB = connectDB;
const closeDB = () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing SQLite database:', err.message);
            throw new Error('Error');
        }
        else {
            console.log('Closed SQLite database.');
        }
    });
};
exports.closeDB = closeDB;
const initializeTables = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, items_1.createItemsTable)();
    (0, itemController_1.initialize)();
    yield (0, cart_1.createCartTable)();
    yield (0, orders_1.createOrdersTable)();
});
//# sourceMappingURL=db.js.map