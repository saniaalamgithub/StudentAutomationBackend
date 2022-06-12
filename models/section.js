const Section = function (sequelize, DataTypes) {
  return sequelize.define("section", {
    section_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    section_name: { type: DataTypes.STRING, allowNull: false },
    secret_code: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    
    
  });
};

module.exports = Section;
