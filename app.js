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
const teacherController = require("./controller/teacherController");

app.get("/load", seederController.doIt);
app.post("/login", userController.tryLogin);
app.post("/user/create", auth, userController.createUser);
app.post("/student/create", auth, studentController.createStudent);
app.post("/department/create", auth, departmentController.createDepartment);
app.post("/student/create", auth, studentController.getStudents);
app.post("/departments", auth, departmentController.getDepartments);

app.post("/ward", auth, guardianController.getWardInfo);
app.post("/welcome", auth, userController.sayHello);
app.post("/users", userController.getUsers);
app.post("/students", studentController.getStudents);
app.post("/teachers", teacherController.getTeachers);
app.post("/teacher", auth, teacherController.getOneTeacher);
app.post("/teacher/:id/courses", auth, teacherController.getTeachersCourseList);
app.post("/attendence", auth, teacherController.takeAttendence);
app.post("/attendence/:secId", auth, teacherController.getAttendence);

module.exports = app;
