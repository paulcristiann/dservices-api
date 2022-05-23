import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
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
      throw new NotFoundException('User not found');
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
