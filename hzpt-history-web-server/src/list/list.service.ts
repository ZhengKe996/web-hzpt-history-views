import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { QueryDto } from './dto/list-query.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}
  create(createListDto: CreateListDto) {
    return this.listRepository.insert(createListDto);
  }

  findAll(queryInfoDto: QueryDto) {
    if (queryInfoDto.category && queryInfoDto.grade) {
      return this.listRepository.find({
        where: { category: queryInfoDto.category, grade: queryInfoDto.grade },
      });
    } else if (queryInfoDto.category) {
      return this.listRepository.find({
        where: { category: queryInfoDto.category },
      });
    } else if (queryInfoDto.grade) {
      return this.listRepository.find({
        where: { grade: queryInfoDto.grade },
      });
    } else {
      return this.listRepository.find();
    }
  }

  findGradeAll() {
    return this.listRepository
      .createQueryBuilder('list')
      .select(['grade'])
      .distinct(true)
      .getRawMany();
  }

  async findCategoryAll() {
    const res = await this.listRepository
      .createQueryBuilder('list')
      .select(['category', 'grade'])
      .distinct(true)
      .getRawMany();

    // 对象数组根据id分组并转map
    const map = res.reduce((acc, item) => {
      // 判断当前 id 在 map 对象是否已新建数组，如果没有，则新建一个空数组
      if (!acc.has(item.category)) {
        acc.set(item.category, []);
      }
      // 将当前元素推入对应的数组
      acc.get(item.category).push(item.grade);
      return acc;
    }, new Map());
    const result = [];
    for (const [key, value] of map.entries()) {
      result.push({ category: key, grades: value });
    }
    return result;
  }

  findOne(id: number) {
    return this.listRepository.findOneBy({ id });
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.listRepository.update(id, updateListDto);
  }

  remove(id: number) {
    return this.listRepository.delete(id);
  }
}
