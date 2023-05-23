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

@Controller('api/get')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('/list')
  async create(@Body() createListDto: CreateListDto) {
    createListDto.panelimgurl = '';
    const res = await this.listService.create(createListDto);
    if (res.generatedMaps.length > 0)
      return {
        success: true,
        message: 'OK',
      };
    else {
      return {
        success: false,
        message: 'Error',
      };
    }
  }

  @Post('/list-all')
  async createAll(@Body() createLists: CreateListDto[]) {
    try {
      createLists.forEach(async (item) => {
        item.panelimgurl = '';
        const { generatedMaps } = await this.listService.create(item);
        if (generatedMaps.length <= 0) {
          new Error();
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

    // createListDto.panelimgurl = '';
    // const res = await this.listService.create(createListDto);
    // if (res.generatedMaps.length > 0)
    //   return {
    //     success: true,
    //     message: 'OK',
    //   };
    // else {
    //   return {
    //     success: false,
    //     message: 'Error',
    //   };
    // }
  }

  @Get('/list')
  async findAll(@Query() queryInfoDto: QueryDto) {
    const res = await this.listService.findAll(queryInfoDto);
    return {
      success: true,
      message: 'OK',
      data: res.slice(0, 20),
    };
  }

  @Get('/grade')
  async findGradeAll() {
    const res = await this.listService.findGradeAll();
    return {
      success: true,
      message: 'OK',
      data: res,
    };
  }

  @Get('/list/:id')
  async findOne(@Param('id') id: number) {
    const info = await this.listService.findOne(id);
    if (info == null) {
      return { success: false, message: 'Error' };
    }
    return {
      success: true,
      message: 'OK',
      data: info,
    };
  }

  @Patch('/list/:id')
  async update(@Param('id') id: number, @Body() updateListDto: UpdateListDto) {
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
  }

  @Delete('/list/:id')
  async remove(@Param('id') id: null) {
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
  }
}
