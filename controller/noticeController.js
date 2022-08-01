const noticeController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

noticeController.createNotice = async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let filePath = req.file;
  console.log(title, " - ", content, " - ", filePath);
  await db.notice
    .create({
      title: title.trim().toLowerCase(),
      content: content.trim().toUpperCase(),
      filePath: filePath?.filename,
      userUserId: req.verifiedUser.id
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

noticeController.getNotices = async (req, res) => {
  await db.notice
    .findAll({
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.teacher,
              include: [
                {
                  model: db.department
                }
              ]
            }
          ]
        },
        {
          model: db.section,
          include: [
            {
              model: db.course
            }
          ]
        }
      ]
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Not Found"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

noticeController.getOneNotice = async (req, res) => {
  await db.user
    .findOne({
      where: {
        email: req.verifiedUser.email
      },
      include: [
        {
          model: db.notice,
          include: [
            {
              model: db.section,
              include: [
                {
                  model: db.course
                },
                {
                  model: db.notice
                },
                {
                  model: db.courseTaken,
                  include: [
                    {
                      model: db.student
                    }
                  ]
                }
              ]
            },
            {
              model: db.complain
            }
          ]
        }
      ]
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Not Found"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

noticeController.getNoticesCourseList = async (req, res) => {
  await db.notice
    .findByPk(req.params.id)
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Not Found"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

noticeController.takeAttendence = async (req, res) => {
  console.log(req.body.attendenceData);
  await db.attendence
    .bulkCreate(req.body.attendenceData, {
      updateOnDuplicate: ["is_present"]
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Insertion Failed"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

noticeController.getAttendence = async (req, res) => {
  await db.attendence
    .findAll({
      where: { sectionSectionId: req.params.secId },
      include: [
        {
          model: db.student
        }
      ]
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Not Found"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = noticeController;
