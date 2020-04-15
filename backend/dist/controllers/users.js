"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = function (req, res, next) {
    console.log("GET Request in users");
    res.json({ message: "It works " });
};
