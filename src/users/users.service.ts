import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { bech32 } from '@elrondnetwork/transaction-decoder/node_modules/bech32'
import { json } from 'stream/consumers';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await bech32.decode(createUserDto.wallet_address)
    }catch (error) {
      throw new BadRequestException('invalid wallet')
    }
    if(createUserDto.nickname == ""){
      createUserDto.nickname = "Anonymous";
    }
    console.log(createUserDto)
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(createUserDto);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(wallet_address: string) {
    const user = await this.userRepository.findOne({
      where: {
        wallet_address: wallet_address,
      },
    });
    if (!user) {
      //throw new NotFoundException('User not found');
      //return JSON.parse('{"wallet_address": "", "nickname": ""}')
      return {wallet_address: "", nickname: "", notExist: true};
    }
    return user;
  }

  async update(wallet_address: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        wallet_address: wallet_address,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update({ wallet_address }, updateUserDto);
    return await this.userRepository.findOne({ wallet_address });
  }

  async remove(wallet_address: string) {
    await this.userRepository.delete({ wallet_address });
    return { deleted: true };
  }
}
