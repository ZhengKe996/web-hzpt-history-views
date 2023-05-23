import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('set/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return {
        success: true,
        message: 'OK',
        data: {
          imgUrl: `${file.path}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error',
      };
    }
  }
}
