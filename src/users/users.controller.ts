import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Fetches the list of all the users in the database.' })
  @ApiOkResponse()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Creates a user with the address and the nickname.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':wallet_address')
  @ApiOperation({ summary: 'Gets a user object from the database.' })
  findOne(@Param('wallet_address') wallet_address: string) {
    return this.usersService.findOne(wallet_address);
  }

  @Patch(':wallet_address')
  @ApiOperation({ summary: 'Updates a user object from the database.' })
  update(@Param('wallet_address') wallet_address: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(wallet_address, updateUserDto);
  }

  @Delete(':wallet_address')
  @ApiOperation({ summary: 'Deletes a user object from the database.' })
  remove(@Param('wallet_address') wallet_address: string) {
    return this.usersService.remove(wallet_address);
  }
}
