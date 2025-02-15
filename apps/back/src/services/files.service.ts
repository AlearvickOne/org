import { UploadedFile } from 'express-fileupload';

export class FilesService {
  private static AVATARS_PATH = '/avatars';
  private static BLOG_IMG_PATH = '/blogImgs';

  static async getPathToAvatarUser(uid: string, ext: string) {
    return `${this.AVATARS_PATH}/${uid}.${ext}`;
  }

  static async getPathToBlogImg(blogId: string, ext: string) {
    return `${this.BLOG_IMG_PATH}/${blogId}.${ext}`;
  }

  static async mvAvatarUser(file: UploadedFile, uid: string, ext: string) {
    await file.mv(`./public${this.AVATARS_PATH}/${uid}.${ext}`);
    return this.getPathToAvatarUser(uid, ext);
  }

  static async mvBlogImgSave(file: UploadedFile, blogId: string, ext: string) {
    await file.mv(`./public${this.BLOG_IMG_PATH}/${blogId}.${ext}`);
    return this.getPathToBlogImg(blogId, ext);
  }
}
