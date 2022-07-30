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

  await db.timeslot
    .bulkCreate(
      [
        {
          day: "SUNDAY",
          start_time: "2018-01-01T10:00:00.000Z",
          end_time: "2018-01-01T11:30:00"
        },
        {
          day: "MONDAY",
          start_time: "2018-01-01T11:40:00Z",
          end_time: "2018-01-01T12:10:00Z"
        },
        {
          day: "MONDAY",
          start_time: "2018-01-01T03:00:00Z",
          end_time: "2018-01-01T11:30:00Z"
        }
      ],
      { validate: true }
    )
    .then(() => {
      console.log(`Data Added to Timeslot`);
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
        },
        {
          email: "bb@bb.bb",
          password: userPassword,
          role: "TEACHER",
          secret_code: "Q7Wjfg5rrfufuiyghghjthgU",
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
          departmentDepartmentId: 3,
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
          }
        },
        {
          name: "Asraf Mohiuddin",
          university_student_id: 15240,
          phone_number: "8801911409112",
          user: {
            email: "a@a.a",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 3,
          guardian: {
            name: "Sayra Banu",
            phone_number: "8801911409172",
            user: {
              email: "aaaa@aaaa.aaaa",
              password: userPassword,
              role: "GUARDIAN",
              secret_code: "srytaews3ddad4a65a47dsa",
              is_active: false
            }
          },
          semester: {
            name: "SPRING",
            year: "2020"
          }
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

  await db.teacher
    .bulkCreate([
      {
        name: "azad rahman",
        designation: "lecturer",
        phone_number: 0987654321,
        departmentDepartmentId: 1,
        userUserId: 2
      }
    ])
    .then(() => {
      console.log(`teacher Added`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.complain
    .bulkCreate([
      {
        content: "not attentive",
        notify_parent: true,
        date: "2022-06-25",
        studentStudentId: 1,
        teacherTeacherId: 1
      },
      {
        content: "late in class",
        notify_parent: true,
        date: "2022-06-23",
        studentStudentId: 1,
        teacherTeacherId: 1
      }
    ])
    .then(() => {
      console.log(`Data Added to complain`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.result
    .bulkCreate([
      {
        grade: 3.75,
        studentStudentId: 1,
        courseCourseId: 1
      },
      {
        grade: 3.5,
        studentStudentId: 1,
        courseCourseId: 2
      },
      {
        grade: 2.75,
        studentStudentId: 1,
        courseCourseId: 3
      }
    ])
    .then(() => {
      console.log(`Student Added to Result`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.section
    .bulkCreate([
      {
        section_name: "A",
        active: true,
        timeslotTimeslotId: 1,
        teacherTeacherId: 1,
        courseCourseId: 1
      },
      {
        section_name: "B",
        active: true,
        timeslotTimeslotId: 2,
        teacherTeacherId: 1,
        courseCourseId: 1
      },
      {
        section_name: "C",
        active: true,
        timeslotTimeslotId: 3,
        teacherTeacherId: 1,
        courseCourseId: 2
      }
    ])
    .then(() => {
      console.log(`Student Added to Result`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.courseTaken
    .bulkCreate([
      {
        sectionSectionId: 1,
        studentStudentId: 1
      },
      {
        sectionSectionId: 2,
        studentStudentId: 1
      },
      {
        sectionSectionId: 3,
        studentStudentId: 1
      },
      {
        sectionSectionId: 1,
        studentStudentId: 2
      },
      {
        sectionSectionId: 2,
        studentStudentId: 2
      },
      {
        sectionSectionId: 3,
        studentStudentId: 2
      }
    ])
    .then(() => {
      console.log(`Data Added to CourseTaken`);
    })
    .catch((error) => {
      return console.error(error);
    });

  await db.notice
    .bulkCreate([
      {
        title: "University closed on 17 September",
        userUserId: 1
      },
      {
        title: "Scholarships for Summer Semester 2022",
        content:
          "Applications are invited from meritorious but needy students of 2nd semester and onward for award of the following Scholarships for Summer semester 2022. Students enjoying 100% scholarship from the university do not qualify for the same. Eligible student who want to apply for need base scholarship visit this link and apply for scholarship. ",
        userUserId: 1
      },
      {
        title: "Your classmate needs help",
        content:
          "Applications are invited from meritorious but needy students of 2nd semester and onward for award of the following Scholarships for Summer semester 2022. Students enjoying 100% scholarship from the university do not qualify for the same. Eligible student who want to apply for need base scholarship visit this link and apply for scholarship. "
      }
    ])
    .then(() => {
      console.log(`Data Added to Notice`);
    })
    .catch((error) => {
      return console.error(error);
    });
  res.send("done");
};

module.exports = seederController;
