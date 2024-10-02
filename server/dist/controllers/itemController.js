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
exports.getById = exports.getAll = exports.initialize = void 0;
const uuid_1 = require("uuid");
const items_1 = require("../models/items");
const items_2 = require("../types/items");
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = [
        { id: (0, uuid_1.v4)(), name: 'Shirt', price: 300, category: items_2.Category.FASHION },
        { id: (0, uuid_1.v4)(), name: 'Jeans', price: 400, category: items_2.Category.FASHION },
        { id: (0, uuid_1.v4)(), name: 'Lipstick', price: 50, category: items_2.Category.BEAUTY },
        { id: (0, uuid_1.v4)(), name: 'Foundation', price: 100, category: items_2.Category.BEAUTY }
    ];
    for (const item of items) {
        yield (0, items_1.addNewItem)(item);
    }
    console.log('Initial items added to the store.');
});
exports.initialize = initialize;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, items_1.getAllItems)();
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, items_1.getItemById)(id);
});
exports.getById = getById;
//# sourceMappingURL=itemController.js.map