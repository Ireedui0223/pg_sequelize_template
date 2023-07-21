import { DataTypes, Model, Sequelize } from 'sequelize';

export default class File extends Model {
  public static createModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        mimetype: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            len: [2, 100]
          }
        },
        name: {
          type: DataTypes.STRING(100),
          validate: {
            len: [4, 100]
          }
        },
        size: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        url: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        key: {
          type: DataTypes.STRING(100),
          validate: {
            len: [10, 100]
          }
        },
        thumb_800: {
          type: DataTypes.STRING,
          allowNull: true
        },
        thumb_300: {
          type: DataTypes.STRING,
          allowNull: true
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      },
      {
        sequelize,
        modelName: 'File'
      }
    );
  }
}
