import { DataTypes, Model, Sequelize } from 'sequelize';
import { USER_ENUM } from './Enum';
export default class User extends Model {
  public email!: string;
  public username!: string;
  public password!: string;
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
            is: /^[0-9a-zA-Z]/i,
            msg: 'Invalid password'
          }
        },
        roles: {
          type: DataTypes.ENUM(...USER_ENUM.ROLES)
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
        modelName: 'users',
        timestamps: true
      }
    );
  }
}
