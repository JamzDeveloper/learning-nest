import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.sedd';
import { BrandsService } from '../brands/brands.service';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsServices: CarsService,
    private readonly bransServices: BrandsService,
  ) {}
  populateDB() {
    this.carsServices.fillCarsWithSeedData(CARS_SEED);
    this.bransServices.fillBrandsWithSeedData(BRANDS_SEED);
    
    return 'seed';
  }
}
