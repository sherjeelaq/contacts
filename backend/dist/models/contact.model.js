"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    phone: String,
    photo: String
});
const Contact = (0, mongoose_1.model)('Contacts', ContactSchema);
exports.Contact = Contact;
