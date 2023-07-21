import { DataTypes, Model, Sequelize } from 'sequelize';
import { USER_ENUM } from './enum';
export default class User extends Model {
  public email!: string;
  public roles!: string;
  public static createModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING(64),
          validate: {
            is: /^[0-9a-zA-Z]/i
          }
        },
        roles: {
          type: DataTypes.ENUM(...USER_ENUM.ROLES),
          defaultValue: USER_ENUM.ROLES[1]
        },
        isVerify: {
          type: DataTypes.ENUM(...USER_ENUM.VERIFY)
        },
        pushToken: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },

      {
        sequelize,
        modelName: 'User',
        timestamps: true
      }
    );
  }
}
