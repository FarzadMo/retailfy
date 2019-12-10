module.exports = function (sequelize, DataTypes) {
  let Ad = sequelize.define(
    "Ad",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: "Any post's title must have at least 3 and max 50 characters"
          }
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 200],
            msg: "Location must have at least 6 and max 200 characters"
          }
        }
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [10, 1000],
            msg:
              "Post description must have at least 10 and max 1000 characters"
          }
        }
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true
      },

      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      category: {
        type: DataTypes.STRING,

      },

      contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: {
            args: [1, 200],
            msg: "E-mail must have max 200 characters"
          }
        }
      }
    },
    {
      freezeTableName: true,
/////////// use hooks with express-fileupoad//////////////////
      // hooks: {
      //   //trigger to update the file name after store on database
      //   afterCreate: function (ad) {
      //     if (ad.image) {
      //       let fileName =
      //         "Ad" +ad.id + "." + ad.image;
      //       ad.image = fileName;

      //       Ad.update(
      //         {
      //           image: fileName
      //         },
      //         {
      //           where: {
      //             id: ad.id
      //           }
      //         }
      //       ).then(() => {
      //         console.log("Image renamed!");
      //       });
      //     }
      //   }
      // }
      //////////////////////////////////////////
    }
  );

  Ad.associate = function (models) {
    Ad.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ad;
};
