"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const home_route_1 = __importDefault(require("./routes/home.route"));
const subTasks_route_1 = __importDefault(require("./routes/subTasks.route"));
const tasks_route_1 = __importDefault(require("./routes/tasks.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/", home_route_1.default);
app.use("/api/auth/", auth_route_1.default);
app.use("/api/users/", users_route_1.default);
app.use("/api/tasks/", tasks_route_1.default);
app.use("/api/subtasks/", subTasks_route_1.default);
app.use((err, _, res, __) => {
    console.error(err);
    return res.status(500).json({
        message: "An error occurred!",
    });
});
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}...`);
});
