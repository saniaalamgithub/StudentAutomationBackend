const CourseTaken = function (sequelize, DataTypes) {
    return sequelize.define('course_taken', {
    course_taken_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    
    
})}
  
module.exports = CourseTaken