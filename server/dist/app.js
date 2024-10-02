"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let port = 8887;
let app = (0, express_1.default)();
app.listen(port, () => {
    console.log(`Server has started and listening at port ${port}`);
});
//# sourceMappingURL=app.js.map