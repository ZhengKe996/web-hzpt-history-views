import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { QueryDto } from './dto/list-query.dto';

@Controller('api')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('/set/list')
  async create(@Body() createListDto: CreateListDto) {
    try {
      const res = await this.listService.create(createListDto);
      if (res.generatedMaps.length > 0) {
        return {
          success: true,
          message: 'OK',
        };
      }
    } catch (error) {
      return { success: false, message: 'Error' };
    }
  }

  @Post('/set/list-all')
  async createAll(@Body() createLists: CreateListDto[]) {
    try {
      createLists.forEach(async (item) => {
        if (item.category && item.classname && item.grade && item.photo) {
          const { generatedMaps } = await this.listService.create(item);
          if (generatedMaps.length <= 0) {
            return {
              success: false,
              message: 'Error',
            };
          }
        }
      });
      return {
        success: true,
        message: 'OK',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error',
      };
    }
  }

  @Get('/get/list')
  async findAll(@Query() queryInfoDto: QueryDto) {
    try {
      const res = await this.listService.findAll(queryInfoDto);
      return {
        success: true,
        message: 'OK',
        data: res,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error',
      };
    }
  }

  /**
   * 前端查年级
   * @returns
   */
  @Get('/get/grade')
  async findGradeAll() {
    try {
      const res = await this.listService.findGradeAll();
      return {
        success: true,
        message: 'OK',
        data: res,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error',
      };
    }
  }

  /**
   * 查学院+年级
   * @returns
   */
  @Get('/get/indexes')
  async findIndexesAll() {
    try {
      const result = await this.listService.findCategoryAll();

      return {
        success: true,
        message: 'OK',
        data: result,
      };
    } catch (error) {
      return { success: false, message: 'Error' };
    }
  }

  @Get('/get/list/:id')
  async findOne(@Param('id') id: number) {
    try {
      const info = await this.listService.findOne(id);
      if (info == null) {
        return { success: false, message: 'Error' };
      }
      return {
        success: true,
        message: 'OK',
        data: info,
      };
    } catch (error) {
      return { success: false, message: 'Error' };
    }
  }

  @Patch('/set/list/:id')
  async update(@Param('id') id: number, @Body() updateListDto: UpdateListDto) {
    try {
      const info = await this.listService.findOne(id);
      if (info == null) {
        return { success: false, message: 'Error' };
      }

      const res = await this.listService.update(id, updateListDto);
      if (res.affected > 0) {
        return {
          success: true,
          message: 'OK',
        };
      }
    } catch (error) {
      return { success: false, message: 'Error' };
    }
  }

  @Delete('/set/list/:id')
  async remove(@Param('id') id: null) {
    try {
      const info = await this.listService.findOne(id);
      if (info == null) {
        return { success: false, message: 'Error' };
      }
      const res = await this.listService.remove(id);
      if (res.affected > 0) {
        return {
          success: true,
          message: 'OK',
        };
      }
    } catch (error) {
      return { success: false, message: 'Error' };
    }
  }
}
