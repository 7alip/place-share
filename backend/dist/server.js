"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_middleware_1 = __importDefault(require("./middlewares/cors-middleware"));
var errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler-middleware"));
var places_routes_1 = __importDefault(require("./routes/places-routes"));
var users_routes_1 = __importDefault(require("./routes/users-routes"));
var notFound_middleware_1 = __importDefault(require("./middlewares/notFound-middleware"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_middleware_1.default);
app.use("/api/user", users_routes_1.default);
app.use("/api/places", places_routes_1.default);
app.use(notFound_middleware_1.default);
app.use(errorHandler_middleware_1.default);
app.listen(5000);
