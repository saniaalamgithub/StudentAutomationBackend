require("dotenv").config();

var con = require("./config/database");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors")
app.use(cors())

var jwt = require('jsonwebtoken');

const auth = require("./middlewire/auth");

app.get("/setupalldb", (req,res) => {
  const userCreateQuery = "CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255), password VARCHAR(255), role VARCHAR(255))";

  var studentCreateQuery =
  "CREATE TABLE student (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), department_id int, student_id VARCHAR(255))";

  var teacherCreateQuery =
  "CREATE TABLE teacher (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), department_id int, employee_id VARCHAR(255), designation VARCHAR(255))";

  var departmentCreateQuery =
  "CREATE TABLE department (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";

  var noticeCreateQuery =
  "CREATE TABLE notice (id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(255), for_class int)";

  var courseCreateQuery =
  "CREATE TABLE course (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), course_code VARCHAR(255))";

  var sectionCreateQuery =
  "CREATE TABLE section (id INT AUTO_INCREMENT PRIMARY KEY, section_code VARCHAR(255), course_id int, timeslot VARCHAR(255), teacher_id int)";

  var studentInSectionCreateQuery =
  "CREATE TABLE student_in_section (id INT AUTO_INCREMENT PRIMARY KEY, section_id int, student_id int)";

  var messageCreateQuery =
  "CREATE TABLE message (id INT AUTO_INCREMENT PRIMARY KEY, content VARCHAR(255), user_id int, date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE())";


  con.query(userCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("userCreateQuery 1 added");
  });
  con.query(teacherCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("teacherCreateQuery 1 added");
  });
  con.query(studentCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("studentCreateQuery 1 added");
  });
  con.query(departmentCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("departmentCreateQuery 1 added");
  });
  con.query(noticeCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("noticeCreateQuery 1 added");
  });
  con.query(courseCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("courseCreateQuery 1 added");
  });
  con.query(sectionCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("sectionCreateQuery 1 added");
  });
  con.query(studentInSectionCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("studentInSectionCreateQuery 1 added");
  });
  con.query(messageCreateQuery, function (err1, result1) {
    if (err1) throw err1;
    console.log("messageCreateQuery 1 added");
  });
});

// Logic goes here
app.post("/login", (req, res) => {
  con.query(
    // select * from user where email='tusar@gmail.com' and password ='123456' and role='student'
    "select * from user where email='" +
      req.body.email +
      "' and password='" +
      req.body.password +
      "'",
    function (err, result) {
      if (err) {
        res.status(500).send(err);
      } else if (result.length == 0) {
        res.status(404).send("password mismatch");
      } else {
        const token = jwt.sign(
            { email: req.body.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
        res.status(200).send(token);
      }
    }
  );
});

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌, Sania ");
});

module.exports = app;
