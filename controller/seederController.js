const seederController = {};
const db = require("../utils/db");
const bcrypt = require("bcrypt");
const { guardian, semester } = require("../utils/db");
const config = process.env;

seederController.doIt = async (req, res) => {
  await db.department
    .bulkCreate(
      [
        // {
        //   name: "Bachelor of Computer Science and Engineering",
        //   short_code: "BCSE"
        // },
        {
          name: "Bachelor of Business Administration",
          short_code: "BBA"
        },
        {
          name: "Bachelor of Science in Mechanical Engineering",
          short_code: "BSME"
        },
        {
          name: "Bachelor of Electrical & Electronics Engineering",
          short_code: "BEEE"
        }
      ],
      { validate: true }
    )
    .then(() => {
      console.log(`Data Added to Department`);
    })
    .catch((error) => {
      return console.error(error);
    });

  userPassword = await bcrypt.hashSync(
    "123456",
    bcrypt.genSaltSync(Number(config.SALT_ROUND))
  );
  await db.user
    .bulkCreate(
      [
        {
          email: "admin@xyz-university.com",
          password: userPassword,
          role: "ADMIN",
          secret_code: "es4d63qted9qasg76d8tq862138rfe86dqf",
          is_active: true
        }
      ],
      { validate: true }
    )
    .then(() => {
      console.log(`Data Added to User`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.semester
    .bulkCreate(
      [
        {
          name: "SPRING",
          year: "2022"
        },
        {
          name: "SUMMER",
          year: "2022"
        },
        {
          name: "FALL",
          year: "2022"
        }
      ],
      { validate: true }
    )
    .then(() => {
      console.log(`Data Added to Semester`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.course
    .bulkCreate([
      {
        name: "BBA101",
        credit: 3,
        serial: 1,
        departmentDepartmentId: 1,
        is_offered: true
      },
      {
        name: "BBA102",
        credit: 3,
        serial: 2,
        departmentDepartmentId: 1,
        is_offered: true
      },
      {
        name: "BBA103",
        credit: 3,
        serial: 3,
        departmentDepartmentId: 1,
        is_offered: true
      },
      {
        name: "BSME101",
        credit: 3,
        serial: 1,
        departmentDepartmentId: 2,
        is_offered: true
      },
      {
        name: "BSME102",
        credit: 4,
        serial: 2,
        departmentDepartmentId: 2,
        is_offered: true
      },
      {
        name: "BSME103",
        credit: 4,
        serial: 3,
        departmentDepartmentId: 2,
        is_offered: true
      },
      {
        name: "BEEE101",
        credit: 4,
        serial: 1,
        departmentDepartmentId: 3,
        is_offered: true
      },
      {
        name: "BEEE102",
        credit: 4,
        serial: 2,
        departmentDepartmentId: 3,
        is_offered: true
      },
      {
        name: "BEEE103",
        credit: 3,
        serial: 3,
        departmentDepartmentId: 3,
        is_offered: true
      }
    ])
    .then(() => {
      console.log(`Data Added to Courses`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.student
    .bulkCreate(
      [
        {
          name: "Abul Kalam",
          university_student_id: 85641,
          phone_number: "8801911409112",
          user: {
            email: "aa@aa.aa",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId:3,
          guardian: {
            name: "Abdul Karim",
            phone_number: "8801911409172",
            user: {
              email: "aaa@aaa.aaa",
              password: userPassword,
              role: "GUARDIAN",
              secret_code: "srytadfja64354a65a47dsa",
              is_active: false
            }
          },
          semester: {
            name: "SPRING",
            year: "2021"
          },
          
        }
      ],
      {
        validate: true,
        include: [
          db.user,
          db.department,
          {
            model: db.guardian,
            include: [db.user]
          },
          db.semester,
          db.result
        ]
      }
    )
    .then(() => {
      console.log(`Student Added to Semester`);
    })
    .catch((error) => {
      return console.error(error);
    });

    db.result.bulkCreate(
      [
        {
          grade: 3.75,
          studentStudentId:1,
          courseCourseId: 1
        },
        {
          grade: 3.5,
          studentStudentId:1,
          courseCourseId: 2
        },
        {
          grade: 2.75,
          studentStudentId:1,
          courseCourseId: 3
        }
      ]
    )
    .then(() => {
      console.log(`Student Added to Result`);
    })
    .catch((error) => {
      return console.error(error);
    });
  res.send("done");
};

module.exports = seederController;
