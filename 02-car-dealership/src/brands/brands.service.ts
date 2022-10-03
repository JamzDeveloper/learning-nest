import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];
  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const bran: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(bran);
    return bran;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id == id);
    if (!brand) throw new NotFoundException(`Bran with id "${id}" not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id == id) {
        (brand.updatedAt = new Date().getTime()),
          (brandDB = { ...brandDB, ...updateBrandDto });
        return brandDB;
      }
      return brand;
    });
  }

  remove(id: string) {
    let brandDB = this.findOne(id);
    this.brands = this.brands.filter((bran) => bran.id !== id);
  }
  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}