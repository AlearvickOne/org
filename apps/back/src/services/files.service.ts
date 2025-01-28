import { UploadedFile } from 'express-fileupload';

export class FilesService {
  private static AVATARS_PATH = '/avatars';

  static async getPathToAvatarUser(uid: string, ext: string) {
    return `${this.AVATARS_PATH}/${uid}.${ext}`;
  }

  static async mvAvatarUser(file: UploadedFile, uid: string, ext: string) {
    await file.mv(`./public${this.AVATARS_PATH}/${uid}.${ext}`);
    return this.getPathToAvatarUser(uid, ext);
  }
}
