const seederBig = {};
const bcrypt = require("bcrypt");
const config = process.env;

seederBig.doIt = async (db) => {
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
          email: "aa@aa.aa",
          password: userPassword,
          role: "ADMIN",
          secret_code: "es4d63qted9qasg76d8tq862138rfe86dqf",
          is_active: true
        },
        {
          email: "tt1@tt.tt",
          password: userPassword,
          role: "TEACHER",
          secret_code: "Q7Wjfg5rrfufuiyghghjthgU",
          is_active: true
        },
        {
          email: "tt2@tt.tt",
          password: userPassword,
          role: "TEACHER",
          secret_code: "Q7Wjfg5rrfufuiyghghjthgU",
          is_active: true
        },
        {
          email: "tt3@tt.tt",
          password: userPassword,
          role: "TEACHER",
          secret_code: "Q7Wjfg5rrfufuiyghghjthgU",
          is_active: true
        },
        {
          email: "tt4@tt.tt",
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
          phone_number: "1911409112",
          user: {
            email: "ss1@ss.ss",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 3,
          guardian: {
            name: "Abdul Karim",
            phone_number: "1911409172",
            user: {
              email: "gg1@gg.gg",
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
          name: "Arman Shahriar",
          university_student_id: 43256,
          phone_number: "1911409112",
          user: {
            email: "ss2@ss.ss",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 3,
          guardian: {
            name: "Sayra Banu",
            phone_number: "1911409172",
            user: {
              email: "gg2@gg.gg",
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
        },
        {
          name: "Sanjida Suchona",
          university_student_id: 87240,
          phone_number: "1911409112",
          user: {
            email: "ss3@ss.ss",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 4,
          guardian: {
            name: "Md Sarwar Kamal",
            phone_number: "1911409172",
            user: {
              email: "gg3@gg.gg",
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
        },
        {
          name: "Adnan Kabir",
          university_student_id: 45990,
          phone_number: "1911409112",
          user: {
            email: "ss4@ss.ss",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 4,
          guardian: {
            name: "Mainuddin Ahmed",
            phone_number: "1911409172",
            user: {
              email: "gg4@gg.gg",
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
        },
        {
          name: "Najmus Shams",
          university_student_id: 17840,
          phone_number: "1911409112",
          user: {
            email: "ss5@ss.ss",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 4,
          guardian: {
            name: "Waliul Shams",
            phone_number: "1911409172",
            user: {
              email: "gg5@gg.gg",
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
        },
        {
          name: "Asraf Mohiuddin",
          university_student_id: 94001,
          phone_number: "1911409112",
          user: {
            email: "ss6@ss.ss",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 4,
          guardian: {
            name: "Alomgir Mohiuddin",
            phone_number: "1911409172",
            user: {
              email: "gg6@gg.gg",
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
        },
        {
          name: "Sandhya Debnath",
          university_student_id: 15240,
          phone_number: "1911409112",
          user: {
            email: "ss7@ss.ss",
            password: userPassword,
            role: "STUDENT",
            secret_code: "srytadfjafsdk6446464a65a47dsa",
            is_active: true
          },
          departmentDepartmentId: 4,
          guardian: {
            name: "Anjali Debnath",
            phone_number: "1911409172",
            user: {
              email: "gg7@gg.gg",
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
        name: "Dr Md Rukonuzzaman",
        designation: "Associate Professor",
        phone_number: 1911409113,
        departmentDepartmentId: 4,
        userUserId: 2
      },
      {
        name: "Nayma Iftekhar",
        designation: "Senior Lecturer",
        phone_number: 1723325010,
        departmentDepartmentId: 1,
        userUserId: 3
      },
      {
        name: "Krishna Das",
        designation: "Assistant Professor",
        phone_number: 1725600625,
        departmentDepartmentId: 4,
        userUserId: 4
      },
      {
        name: "Dr Ehteshamul Haque ",
        designation: "Professor",
        phone_number: 1672317485,
        departmentDepartmentId: 3,
        userUserId: 5
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
        grade: 1.5,
        studentStudentId: 1,
        courseCourseId: 1
      },
      {
        grade: 3.1,
        studentStudentId: 1,
        courseCourseId: 2
      },
      {
        grade: 2.8,
        studentStudentId: 1,
        courseCourseId: 3
      },
      {
        grade: 4,
        studentStudentId: 3,
        courseCourseId: 4
      },
      {
        grade: 3.7,
        studentStudentId: 3,
        courseCourseId: 6
      },
      {
        grade: 3.4,
        studentStudentId: 3,
        courseCourseId: 8
      },
      {
        grade: 3.1,
        studentStudentId: 4,
        courseCourseId: 4
      },
      {
        grade: 2.8,
        studentStudentId: 4,
        courseCourseId: 6
      },
      {
        grade: 2.2,
        studentStudentId: 4,
        courseCourseId: 8
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
        teacherTeacherId: 2,
        courseCourseId: 1
      },
      {
        section_name: "B",
        active: true,
        timeslotTimeslotId: 2,
        teacherTeacherId: 2,
        courseCourseId: 1
      },
      {
        section_name: "A",
        active: true,
        timeslotTimeslotId: 3,
        teacherTeacherId: 2,
        courseCourseId: 2
      },
      {
        section_name: "A",
        active: true,
        timeslotTimeslotId: 1,
        teacherTeacherId: 3,
        courseCourseId: 5
      },
      {
        section_name: "B",
        active: true,
        timeslotTimeslotId: 2,
        teacherTeacherId: 1,
        courseCourseId: 5
      },
      {
        section_name: "C",
        active: true,
        timeslotTimeslotId: 3,
        teacherTeacherId: 1,
        courseCourseId: 5
      },
      {
        section_name: "A",
        active: true,
        timeslotTimeslotId: 1,
        teacherTeacherId: 3,
        courseCourseId: 7
      },
      {
        section_name: "B",
        active: true,
        timeslotTimeslotId: 2,
        teacherTeacherId: 1,
        courseCourseId: 7
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
      },

      {
        sectionSectionId: 4,
        studentStudentId: 3
      },
      {
        sectionSectionId: 7,
        studentStudentId: 3
      },
      {
        sectionSectionId: 5,
        studentStudentId: 4
      },
      {
        sectionSectionId: 7,
        studentStudentId: 4
      },
      {
        sectionSectionId: 5,
        studentStudentId: 5
      },
      {
        sectionSectionId: 8,
        studentStudentId: 5
      },
      {
        sectionSectionId: 4,
        studentStudentId: 6
      },
      {
        sectionSectionId: 7,
        studentStudentId: 6
      },
      {
        sectionSectionId: 4,
        studentStudentId: 7
      },
      {
        sectionSectionId: 8,
        studentStudentId: 7
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
        content: "Hello Students",
        sectionSectionId: 1,
        userUserId: 2
      },
      {
        content: "Assalamualaikum Sir",
        sectionSectionId: 1,
        userUserId: 7
      },
      {
        content: "Hello Sir",
        sectionSectionId: 1,
        userUserId: 6
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

module.exports = seederBig;
