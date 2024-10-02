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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const cart_1 = require("../models/cart");
const orders_1 = require("../models/orders");
const cart_2 = require("./cart");
const uuid_1 = require("uuid");
const checkout = (cartId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cartItems = yield (0, cart_2.getAllItemsByCartId)(cartId);
        yield saveOrderOnCheckout(userId, cartItems);
        yield (0, cart_1.deleteCart)(cartId);
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.checkout = checkout;
const saveOrderOnCheckout = (userId, cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, orders_1.addNewOrder)((0, uuid_1.v4)(), userId, cartItems);
});
//# sourceMappingURL=checkout.js.map