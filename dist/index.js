"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Route_1 = __importDefault(require("./app/Product/Route"));
const _404_1 = __importDefault(require("./middleware/404"));
const error_handle_1 = __importDefault(require("./middleware/error-handle"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
//setup upload
// app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
//parse application/json
app.use(body_parser_1.default.json());
//route
app.use("/api/v1", Route_1.default);
//middleware
app.use(_404_1.default);
app.use(error_handle_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
