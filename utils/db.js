const { Sequelize } = require("sequelize");
const sequelize = require("./sequelize");
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// create the modal instance
db.user = require("../models/user")(sequelize, Sequelize);
db.timeslot = require("../models/timeslot")(sequelize, Sequelize);
db.department = require("../models/department")(sequelize, Sequelize);
db.teacher = require("../models/teacher")(sequelize, Sequelize);
db.student = require("../models/student")(sequelize, Sequelize);
db.course = require("../models/course")(sequelize, Sequelize);
db.message = require("../models/message")(sequelize, Sequelize);
db.section = require("../models/section")(sequelize, Sequelize);
db.result = require("../models/result")(sequelize, Sequelize);
db.semester = require("../models/semester")(sequelize, Sequelize);
db.complain = require("../models/complain")(sequelize, Sequelize);
db.courseTaken = require("../models/courseTaken")(sequelize, Sequelize);
db.prerequisite = require("../models/prerequisite")(sequelize, Sequelize);
db.notice = require("../models/notice")(sequelize, Sequelize);
db.guardian = require("../models/guardian")(sequelize, Sequelize);
db.attendence = require("../models/attendence")(sequelize, Sequelize);
db.wardRequest = require("../models/wardRequest")(sequelize, Sequelize);

//relations
db.teacher.belongsTo(db.user);
db.teacher.belongsTo(db.department);

db.student.belongsTo(db.user);
db.student.belongsTo(db.department);
db.student.belongsTo(db.guardian);
db.student.belongsTo(db.semester); //joined_at

db.guardian.belongsTo(db.user);

db.course.belongsTo(db.department);

db.prerequisite.belongsTo(db.course); //for_course

db.section.belongsTo(db.timeslot);
db.section.belongsTo(db.course);
db.section.belongsTo(db.teacher);

db.courseTaken.belongsTo(db.section);
db.courseTaken.belongsTo(db.student);

db.result.belongsTo(db.course);
db.result.belongsTo(db.student);

db.message.belongsTo(db.user);
db.message.belongsTo(db.user);
db.message.belongsTo(db.section);

db.notice.belongsTo(db.user);
db.notice.belongsTo(db.user);
db.notice.belongsTo(db.section);

db.complain.belongsTo(db.student); //for
db.complain.belongsTo(db.teacher); //by

db.attendence.belongsTo(db.student);
db.attendence.belongsTo(db.section);

db.wardRequest.belongsTo(db.guardian);
db.wardRequest.belongsTo(db.student);

//reverse relation
db.user.hasOne(db.teacher);
db.department.hasMany(db.teacher);

db.user.hasOne(db.student);
db.department.hasMany(db.student);
db.guardian.hasMany(db.student);
db.semester.hasMany(db.student);

db.user.hasOne(db.guardian);

db.department.hasMany(db.course);

db.course.hasOne(db.prerequisite);

db.timeslot.hasMany(db.section);
db.course.hasMany(db.section);
db.teacher.hasMany(db.section);

db.section.hasMany(db.courseTaken);
db.student.hasMany(db.courseTaken);

db.course.hasMany(db.result);
db.student.hasMany(db.result);

db.user.hasMany(db.message);
db.section.hasMany(db.message);

db.user.hasMany(db.notice);
db.section.hasMany(db.notice);

db.student.hasMany(db.complain);
db.teacher.hasMany(db.complain);

db.student.hasMany(db.attendence);
db.section.hasMany(db.attendence);

db.guardian.hasMany(db.wardRequest);
db.student.hasMany(db.wardRequest);

db.sequelize.sync({ force: true, logging: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;
