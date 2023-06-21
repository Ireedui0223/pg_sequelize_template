import { Model, Sequelize } from 'sequelize';

export default class Book_category extends Model {
  public static createModel(sequelize: Sequelize) {
    this.init(
      {},
      {
        sequelize,
        modelName: 'Book_category',
        timestamps: false
      }
    );
  }
}
