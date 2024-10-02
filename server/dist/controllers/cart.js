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
exports.getAllItemsByCartId = exports.addItemsToCart = void 0;
const cart_1 = require("../models/cart");
const addItemsToCart = (items, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = `cart-${userId}`;
    yield (0, cart_1.addItemToCart)(cartId, items);
    yield (0, cart_1.getAllCartDetails)();
    console.log(`Items added to cart`);
    return cartId;
});
exports.addItemsToCart = addItemsToCart;
const getAllItemsByCartId = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let items = yield (0, cart_1.getItemsByCartId)(cartId);
        return items;
    }
    catch (err) {
        console.error(`Error while getting items for cart by id ${cartId}`);
    }
});
exports.getAllItemsByCartId = getAllItemsByCartId;
//# sourceMappingURL=cart.js.map