import File from '../database/models/file';

export default class file_controller {
  static async createFile(doc): Promise<any> {
    const { mimetype, name, url, key, size } = doc;
    const file = await File.create({ mimetype, name, url, key, size });
    return file;
  }
}
