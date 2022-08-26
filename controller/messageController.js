const messageController = {};
const db = require("../utils/db");
var validator = require("validator");
const bcrypt = require("bcrypt");
const config = process.env;

messageController.createMessage = async (req, res) => {
  console.log("req body", req.body);
  let content = req.body.content;
  let filePath = req.file;
  await db.message
    .create({
      content: content,
      filePath: filePath?.filename,
      sectionSectionId: req.body.sectionSectionId,
      userUserId: req.verifiedUser.id
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

messageController.getMessages = async (req, res) => {
  await db.message
    .findAll({
      where: {
        sectionSectionId: req.params.id
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.teacher
            },
            {
              model: db.student
            }
          ]
        }
      ]
    })
    .then((data) => {
      if (data !== null) {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = messageController;
