import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
   private readonly uploadPath = './uploads';

   constructor() {
      if (!fs.existsSync(this.uploadPath)) {
         fs.mkdirSync(this.uploadPath);
      }
   }

   async saveImage(file: Express.Multer.File): Promise<string> {
      if (!file || !file.buffer) {
         throw new Error('Invalid file');
      }

      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_SIZE) {
         throw new Error('File size exceeds 5MB limit');
      }

      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const extension = path.extname(file.originalname).toLowerCase();

      if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(extension)) {
         throw new Error('Invalid file type. Only JPG and PNG are allowed.');
      }

      const uniqueName = `${uuidv4()}${extension}`;
      const filePath = path.join(this.uploadPath, uniqueName);

      fs.writeFileSync(filePath, file.buffer);

      return uniqueName;
   }

   getImagePath(filename: string): string {
      return path.join(this.uploadPath, filename);
   }


   async deleteImage(imageName: string): Promise<void> {
      const filePath = path.join(this.uploadPath, imageName);
      if (fs.existsSync(filePath)) {
         fs.unlinkSync(filePath);
      }
   }

}
