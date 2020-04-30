"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var cors_middleware_1 = __importDefault(require("./middlewares/cors-middleware"));
var errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler-middleware"));
var places_routes_1 = __importDefault(require("./routes/places-routes"));
var users_routes_1 = __importDefault(require("./routes/users-routes"));
var notFound_middleware_1 = __importDefault(require("./middlewares/notFound-middleware"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use("/src/uploads/images", express_1.default.static(path_1.default.join("src", "uploads", "images")));
app.use(cors_middleware_1.default);
app.use("/api/user", users_routes_1.default);
app.use("/api/places", places_routes_1.default);
app.use(notFound_middleware_1.default);
app.use(errorHandler_middleware_1.default);
mongoose_1.default
    .connect("mongodb+srv://testtest:testtest@cluster0-31adc.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(function () {
    app.listen(5000);
})
    .catch(function (error) { return console.log(error); });
