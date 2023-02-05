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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.editContact = exports.getContacts = exports.createContact = void 0;
const models_1 = require("../models/");
const statusCodes_1 = require("../constants/statusCodes");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    const data = {
        name,
        email,
        phone
    };
    if (req.file) {
        data['photo'] =
            req.protocol +
                '://' +
                req.headers.host +
                '/images/' +
                req.file.filename;
    }
    const contact = new models_1.Contact(data);
    try {
        yield contact.save();
        res.sendResponse(null, null, statusCodes_1.statusCodes.OK);
    }
    catch (error) {
        res.sendResponse(null, { message: error.message }, statusCodes_1.statusCodes.BAD_REQUEST);
    }
});
exports.createContact = createContact;
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield models_1.Contact.find({});
    try {
        res.sendResponse(contacts, null, statusCodes_1.statusCodes.OK);
    }
    catch (error) {
        res.sendResponse(null, { message: error.message }, statusCodes_1.statusCodes.BAD_REQUEST);
    }
});
exports.getContacts = getContacts;
const editContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const data = {
        name,
        email,
        phone
    };
    if (req.files && req.files.length > 0 && Array.isArray(req.files)) {
        const foundContact = yield models_1.Contact.findById(id);
        if (foundContact && foundContact.photo) {
            const photoUrl = foundContact.photo.split('/');
            const fullPath = path_1.default.resolve(__dirname +
                '/../../public/' +
                photoUrl[photoUrl.length - 2] +
                '/' +
                photoUrl[photoUrl.length - 1]);
            (0, fs_1.unlink)(fullPath, error => {
                if (error) {
                    console.log("Couldn't delete image");
                }
            });
        }
        data['photo'] =
            req.protocol +
                '://' +
                req.headers.host +
                '/images/' +
                req.files[0].filename;
    }
    try {
        const updatedContact = yield models_1.Contact.findByIdAndUpdate(id, data, {
            new: true
        });
        res.sendResponse(null, null, statusCodes_1.statusCodes.OK);
    }
    catch (error) {
        res.sendResponse(null, { message: error.message }, statusCodes_1.statusCodes.BAD_REQUEST);
    }
});
exports.editContact = editContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const foundContact = yield models_1.Contact.findById(id);
    if (foundContact && foundContact.photo) {
        const photoUrl = foundContact.photo.split('/');
        const fullPath = path_1.default.resolve(__dirname +
            '/../../public/' +
            photoUrl[photoUrl.length - 2] +
            '/' +
            photoUrl[photoUrl.length - 1]);
        (0, fs_1.unlink)(fullPath, error => {
            if (error) {
                console.log("Couldn't delete image");
            }
        });
    }
    try {
        yield models_1.Contact.findByIdAndDelete(id);
        res.sendResponse(null, null, statusCodes_1.statusCodes.OK);
    }
    catch (error) {
        res.sendResponse(null, { message: error.message }, statusCodes_1.statusCodes.BAD_REQUEST);
    }
});
exports.deleteContact = deleteContact;
