const guardianController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");

guardianController.getWardInfo = async (req, res) => {
  console.log(
    req.verifiedUser.role,
    " - ",
    enumData.user[3],
    req.verifiedUser.id
  );
  if (req.verifiedUser.role === enumData.user[3]) {
    await db.user
      .findByPk(req.verifiedUser.id, {
        include: [
          {
            model: db.guardian,
            include: [
              {
                model: db.student,
                include: [
                  {
                    model: db.courseTaken,
                    include: [
                      {
                        model: db.section,
                        include: [
                          {
                            model: db.course
                          }
                        ]
                      }
                    ]
                  },
                  {
                    model: db.result,
                    include:[
                        {
                          model: db.course
                        }
                    ]
                  },
                  {
                    model: db.complain
                  },
                  {
                    model: db.department
                  },
                  {
                    model: db.semester
                  }
                ]
              }
            ]
          }
        ]
      })
      .then((data) => {
        if (data == null) {
          res.status(404).json({
            status: "Not Found"
          });
        } else {
          //   let result = secondaryTask(data);
          res.status(200).json({
            data
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(401).json({ status: "You are not authorized to see this page" });
  }
};

secondaryTask = async (data, res) => {
  await db.guardian.findOne({
    where: { user: data },
    include: [
      {
        model: db.student
      }
    ]
  });
};

module.exports = guardianController;
