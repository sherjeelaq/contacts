"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const customResponse_1 = require("./middlewares/customResponse");
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', false);
(0, models_1.connectDatabase)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(customResponse_1.customResponse);
app.use('/api/', routes_1.default);
app.get('/', (req, res) => {
    res.send('Server up and running!');
});
const publicPath = path_1.default.resolve(__dirname + '/../public');
app.use(express_1.default.static(publicPath));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
