import { CategoryModel } from '../database/init';
export default class CategoryController {
  static async createCategory(doc): Promise<any> {
    const { title, text, status, icon, description } = doc;
    const category = await CategoryModel.create({
      title,
      text,
      status,
      icon,
      description
    });
    return category;
  }
  static async getCategories(): Promise<any> {
    const categories = await CategoryModel.findAll();
    return categories;
  }
}
