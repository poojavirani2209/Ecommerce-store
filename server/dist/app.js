"use strict";
<<<<<<< HEAD
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
=======
>>>>>>> 87ff610 (Setup Nodejs server using Express and TS)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
<<<<<<< HEAD
const db_1 = require("./database/db");
const items_1 = __importDefault(require("./routes/items"));
const cart_1 = __importDefault(require("./routes/cart"));
const checkout_1 = __importDefault(require("./routes/checkout"));
/**
 * Create a new express server application listening on the port specified.
 */
let port = 8887;
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/items", items_1.default);
app.use("/cart", cart_1.default);
app.use("/checkout", checkout_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server has started and listening at port ${port}`);
    try {
        (0, db_1.connectDB)();
    }
    catch (error) {
        console.log(error);
    }
}));
=======
let port = 8887;
let app = (0, express_1.default)();
app.listen(port, () => {
    console.log(`Server has started and listening at port ${port}`);
});
>>>>>>> 87ff610 (Setup Nodejs server using Express and TS)
//# sourceMappingURL=app.js.map