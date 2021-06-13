import { httpProvider } from './http';

export class PosterProvider {
  /**
   * 获取指定文件
   */
  static async getPosters(params): Promise<[IPoster[], number]> {
    return httpProvider.get('/poster', { params });
  }

  /**
   * 删除文件
   * @param id
   */
  static async deletePoster(id): Promise<IPoster> {
    return httpProvider.delete(`/poster/${id}`);
  }
}
