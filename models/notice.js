const Notice = function (sequelize, DataTypes) {
  return sequelize.define("notice", {
    notice_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: false },
    
    
  });
};
module.exports = Notice;
