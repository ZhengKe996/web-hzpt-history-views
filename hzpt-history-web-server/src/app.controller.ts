import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';
import { UploadDto } from './dto/upload.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/sKxYVBCeor')
  async adminePage() {
    const result = await axios.get(
      'http://127.0.0.1:7001/public/pages/index.html',
    );
    return result.data;
  }

  @Get('/')
  async homePage() {
    const result = await axios.get(
      'http://127.0.0.1:7001/public/views/index.html',
    );
    return result.data;
  }

  @Post('api/set/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() upload: UploadDto,
  ) {
    try {
      console.log('id:', upload.id, 'path:', file.path);
      return {
        success: true,
        message: 'OK',
        data: {
          imgUrl: `${file.path}`,
          index: upload.id,
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
