import { Controller, Get, Param, Delete, Res, NotFoundException } from '@nestjs/common';
import { ImageService } from './image.service';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';


@Controller('files')
export class ImageController {
   constructor(private readonly imageService: ImageService) { }

   @Get(':filename')
   getImage(@Param('filename') filename: string, @Res() res: Response) {
      const imagePath = this.imageService.getImagePath(filename); // should return only filename, not full path
      const fullPath = path.join(process.cwd(), imagePath); // build absolute path

      if (fs.existsSync(fullPath)) {
         return res.sendFile(fullPath);
      } else {
         throw new NotFoundException('Image not found');
      }
   }

   @Delete(':filename')
   async deleteImage(@Param('filename') filename: string) {
      try {
         await this.imageService.deleteImage(filename);
         return { message: 'Image deleted successfully' };
      } catch (err) {
         throw new Error('Error deleting image: ' + err.message);
      }
   }
}
