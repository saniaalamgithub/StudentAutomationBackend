require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const auth = require("./middlewire/auth");

const seederController = require("./controller/seederController");
const userController = require("./controller/userController");
const studentController = require("./controller/studentController");
const departmentController = require("./controller/departmentController");
const guardianController = require("./controller/guardianController");

app.get("/load", seederController.doIt);
app.post("/login", userController.tryLogin);
app.post("/user/create", auth, userController.createUser);
app.post("/student/create", auth, studentController.createStudent);
app.post("/department/create", auth, departmentController.createDepartment);
app.post("/student/create", auth, studentController.getStudents);
app.post("/department/create", auth, departmentController.getDepartments);

app.post("/ward", auth, guardianController.getWardInfo);
app.post("/welcome", auth, userController.sayHello);

module.exports = app;
