require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const auth = require("./middlewire/auth");

const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
  onError: function (err, next) {
    console.log("error", err);
    next(err);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000 // 50000000 Bytes = 50 MB
  },
  fileFilter(req, file, cb) {
    console.log("filtering");
    if (!file.originalname.match(/\.(png|jpg|pdf|docx)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload only one png|jpg|pdf|docx file"));
    }
    cb(undefined, true);
  }
});

const seederController = require("./controller/seederController");
const userController = require("./controller/userController");
const studentController = require("./controller/studentController");
const departmentController = require("./controller/departmentController");
const guardianController = require("./controller/guardianController");
const teacherController = require("./controller/teacherController");
const timeslotController = require("./controller/timeslotController");
const resultController = require("./controller/resultController");
const sectionController = require("./controller/sectionController");
const courseController = require("./controller/courseController");
const adminController = require("./controller/adminController");
const noticeController = require("./controller/noticeController");
const complainController = require("./controller/complainController");

app.get("/load", seederController.doIt);
app.post("/login", userController.tryLogin);
app.post("/user/create", auth, userController.createUser);
app.post("/student/create", auth, studentController.createStudent);
app.post("/department/create", auth, departmentController.createDepartment);
app.post("/student/create", auth, studentController.createStudent);
app.post("/departments", auth, departmentController.getDepartments);

app.post("/ward", auth, guardianController.getWardInfo);
app.post("/welcome", auth, userController.sayHello);
app.post("/users", userController.getUsers);
app.post("/students", auth, studentController.getStudents);
app.post("/teachers", teacherController.getTeachers);
app.post("/teacher", auth, teacherController.getOneTeacher);
app.post("/teacher/:id/courses", auth, teacherController.getTeachersCourseList);
app.post("/attendence", auth, teacherController.takeAttendence);
app.post("/attendence/:secId", auth, teacherController.getAttendence);
app.get("/student/:id/courses", studentController.getStudentAndCourse);
app.post("/courses", auth, courseController.getCourse);

app.post("/guardians", guardianController.getGuardians);
app.post("/guardian/create", guardianController.addGuardian);
app.post("/department/create", auth, departmentController.getDepartments);

app.post(
  "/notice/create",
  auth,
  upload.single("formFile"),
  noticeController.createNotice
);
app.post("/complain/create", auth, complainController.createComplain);
app.post("/notices", auth, noticeController.getNotices);
app.post("/complains", auth, complainController.getComplains);

app.put("/admin", auth, adminController.updateAdmin);

app.post("/guardians", guardianController.getGuardians);
app.post("/guardian/create", guardianController.addGuardian);
app.post("/department/create", auth, departmentController.getDepartments);

app.post(
  "/notice/create",
  auth,
  upload.single("formFile"),
  noticeController.createNotice
);
app.post("/complain/create", auth, complainController.createComplain);
app.post("/notices", auth, noticeController.getNotices);
app.post("/complains", auth, complainController.getComplains);

module.exports = app;
