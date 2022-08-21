const seeder = {};
const bcrypt = require("bcrypt");
const config = process.env;

seeder.doIt = async (db) => {
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
        },
        {
          name: "Bachelor of Computer Science & Engineering",
          short_code: "BCSE"
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
          end_time: "2018-01-01T13:00:00"
        },
        {
          day: "MONDAY-WEDNESDAY",
          start_time: "2018-01-01T11:30:00Z",
          end_time: "2018-01-01T13:00:00Z"
        },
        {
          day: "MONDAY-WEDNESDAY",
          start_time: "2018-01-01T08:00:00Z",
          end_time: "2018-01-01T09:30:00Z"
        },
        {
          day: "SUNDAY-MONDAY",
          start_time: "2018-01-01T15:30:00Z",
          end_time: "2018-01-01T17:00:00Z"
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

  userPassword = bcrypt.hashSync(
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
          year: "2017"
        },
        {
          name: "SUMMER",
          year: "2017"
        },
        {
          name: "FALL",
          year: "2017"
        },
        {
          name: "SPRING",
          year: "2018"
        },
        {
          name: "SUMMER",
          year: "2018"
        },
        {
          name: "FALL",
          year: "2018"
        },
        {
          name: "SPRING",
          year: "2019"
        },
        {
          name: "SUMMER",
          year: "2019"
        },
        {
          name: "FALL",
          year: "2019"
        },
        {
          name: "SPRING",
          year: "2020"
        },
        {
          name: "SUMMER",
          year: "2020"
        },
        {
          name: "FALL",
          year: "2020"
        },
        {
          name: "SPRING",
          year: "2021"
        },
        {
          name: "SUMMER",
          year: "2021"
        },
        {
          name: "FALL",
          year: "2021"
        },
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
        name: "Consumer and Buyer Behavior",
        short_code: "MKT302",
        credit: 3,
        serial: 1,
        departmentDepartmentId: 1,
        is_offered: true
      },
      {
        name: "Marketing Research",
        short_code: "MKT401",
        credit: 3,
        serial: 2,
        departmentDepartmentId: 1,
        is_offered: true
      },
      {
        name: "Salesmanship and Sales Management",
        short_code: "MKT303",
        credit: 3,
        serial: 3,
        departmentDepartmentId: 1,
        is_offered: true
      },
      {
        name: "Fundamentals of Computers and Applications",
        short_code: "CSE103",
        credit: 3,
        serial: 1,
        departmentDepartmentId: 4,
        is_offered: true
      },
      {
        name: "Programming C",
        short_code: "CSE183",
        credit: 4,
        serial: 2,
        departmentDepartmentId: 4,
        is_offered: true
      },
      {
        name: "Fundamentals of Electronics and Digital Systems",
        short_code: "CSE231",
        credit: 4,
        serial: 3,
        departmentDepartmentId: 4,
        is_offered: true
      },
      {
        name: "Computer Architecture",
        short_code: "CSE247",
        credit: 4,
        serial: 1,
        departmentDepartmentId: 4,
        is_offered: true
      },
      {
        name: "Operating Systems",
        short_code: "CSE307",
        credit: 4,
        serial: 2,
        departmentDepartmentId: 4,
        is_offered: true
      },
      {
        name: "Physics",
        short_code: "PHY112",
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
              is_active: true
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
            email: "cc@cc.cc",
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
              is_active: true
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
        departmentDepartmentId: 4,
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

  await db.message
    .bulkCreate([
      {
        content: "hello hai by by",
        sectionSectionId: 1,
        userUserId: 2
      },
      {
        content: "hello mia vai",
        sectionSectionId: 1,
        userUserId: 3
      },
      {
        content: "good morning",
        sectionSectionId: 1,
        userUserId: 2
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
  console.log("seeding ended");
};

module.exports = seeder;
