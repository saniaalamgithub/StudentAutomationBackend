const courseController = {};
const db = require("../utils/db");

courseController.getCourse = async (req, res) => {
  await db.course
    .findAll({
      include: [
        {
          model: db.section,
          include: [
            {
              model: db.teacher,
            },
          ],
        },
        {
          model: db.department,
        },
      ],
    })
    .then((data) => {
      if (data == null) {
        res.status(404).json({
          status: "Not Found",
        });
      } else {
        res.status(200).json({
          data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = courseController;
