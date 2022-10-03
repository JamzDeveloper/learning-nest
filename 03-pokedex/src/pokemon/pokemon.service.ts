import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase().trim();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {
    try {
      let pokemon: Pokemon;

      if (!isNaN(+id)) {
        console.log(id);
        pokemon = await this.pokemonModel.findOne({ no: id });
      }

      if (!pokemon && isValidObjectId(id)) {
        pokemon = await this.pokemonModel.findById(id);
      }

      if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({
          name: id.trim().toLocaleLowerCase(),
        });
      }

      if (!pokemon) throw new NotFoundException('Pokemon not found');

      return pokemon;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(id);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name
          .toLocaleLowerCase()
          .trim();
      }
      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (err) {
      this.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return;
  }
  private handleExceptions(err) {
    if (err.code == 11000) {
      throw new BadRequestException(
        `Poken exists in db ${JSON.stringify(err.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't in Pokemon - Check server logs`,
    );
  }
}
