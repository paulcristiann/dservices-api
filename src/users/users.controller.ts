import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiHeader({
  name: 'x-api-key',
  description: 'The API Key of the frontend application',
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOkResponse()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':wallet_address')
  findOne(@Param('wallet_address') wallet_address: string) {
    return this.usersService.findOne(wallet_address);
  }

  @Patch(':wallet_address')
  update(@Param('wallet_address') wallet_address: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(wallet_address, updateUserDto);
  }

  @Delete(':wallet_address')
  remove(@Param('wallet_address') wallet_address: string) {
    return this.usersService.remove(wallet_address);
  }
}
