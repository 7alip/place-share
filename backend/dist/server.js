"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var v4_1 = __importDefault(require("uuid/v4"));
var app = express_1.default();
var DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now
app.use(body_parser_1.default.json());
// CORS Headers => Required for cross-origin/ cross-server communication
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
});
app.get("/products", function (req, res, next) {
    res.status(200).json({ products: DUMMY_PRODUCTS });
});
app.post("/product", function (req, res, next) {
    var _a = req.body, title = _a.title, price = _a.price;
    if (!title || title.trim().length === 0 || !price || price <= 0) {
        return res.status(422).json({
            message: "Invalid input, please enter a valid title and price.",
        });
    }
    var createdProduct = {
        id: v4_1.default(),
        title: title,
        price: price,
    };
    DUMMY_PRODUCTS.push(createdProduct);
    res
        .status(201)
        .json({ message: "Created new product.", product: createdProduct });
});
app.listen(5000); // start Node + Express server on port 5000
