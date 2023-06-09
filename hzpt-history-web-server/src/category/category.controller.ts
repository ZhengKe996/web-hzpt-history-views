import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/set/category')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const res = await this.categoryService.create(createCategoryDto);
      if (res.generatedMaps.length <= 0) {
        throw new Error();
      }
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

  @Post('/set/category/all')
  async createAll(@Body() createCategoryDto: CreateCategoryDto[]) {
    try {
      createCategoryDto.forEach(async (item) => {
        const { generatedMaps } = await this.categoryService.create(item);
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
  }

  @Get('/get/category')
  async findAll() {
    try {
      return {
        success: true,
        message: 'OK',
        data: await this.categoryService.findAll(),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error',
      };
    }
  }

  @Patch('/set/category/:id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const category = await this.categoryService.findOne(id);
      if (category == null) {
        return { success: false, message: 'Error' };
      }

      const res = await this.categoryService.update(id, updateCategoryDto);
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

  @Delete('/set/category/:id')
  async remove(@Param('id') id: number) {
    try {
      const category = await this.categoryService.findOne(id);
      if (category == null) {
        return { success: false, message: 'Error' };
      }
      const res = await this.categoryService.remove(id);
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
