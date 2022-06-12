const seederController = {};
const db = require("../utils/db");
const bcrypt = require("bcrypt");
const config = process.env;

seederController.doIt = async (req, res) => {
  await db.department
    .bulkCreate(
      [
        {
          name: "Bachelor of Computer Science and Engineering",
          short_code: "BCSE"
        },
        { name: "Bachelor of Business Administration", short_code: "BBA" },
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
  await db.users
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
  res.send("done");
};

module.exports = seederController;
