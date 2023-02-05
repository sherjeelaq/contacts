"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("../controllers/contact.controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/images`);
    },
    filename: (req, file, cb) => {
        const regexMatch = file.originalname.match(/\..*$/);
        cb(null, file.fieldname +
            '-' +
            Date.now() +
            (regexMatch && regexMatch.length > 0 ? regexMatch[0] : '.jpg'));
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
});
const router = express_1.default.Router();
router
    .route('/createContact')
    .post(upload.single('photo'), contact_controller_1.createContact);
router.route('/getContacts').get(contact_controller_1.getContacts);
router.route('/editContact/:id').post(upload.any(), contact_controller_1.editContact);
router.route('/deleteContact/:id').delete(contact_controller_1.deleteContact);
exports.default = router;
