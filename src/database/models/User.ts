import { DataTypes, Model, Sequelize } from 'sequelize';

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
        username: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            len: [2, 100]
          }
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
