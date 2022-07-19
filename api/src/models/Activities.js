const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('Activities', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          min: 1,
          max: 5,
          isEven(value) {
            if(value < 1 || value > 5) {
              throw new Error("La dificultad debe ser entre 1 y 5")
            }
          }
        }
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
        allowNull: false,
      },
    }
    )};