import { httpProvider } from './http';

export class CategoryProvider {
  /**
   * 获取所有标签
   */
  static async getCategory(): Promise<ICategory[]> {
    return httpProvider.get('/category');
  }

  /**
   * 添加标签
   * @param data
   */
  static async add(data): Promise<ICategory> {
    return httpProvider.post('/category', data);
  }

  /**
   * 更新标签
   * @param id
   * @param data
   */
  static async update(id, data): Promise<ICategory> {
    return httpProvider.patch(`/category/${id}`, data);
  }

  /**
   * 删除标签
   * @param id
   */
  static async delete(id): Promise<ICategory> {
    return httpProvider.delete(`/category/${id}`);
  }
}
