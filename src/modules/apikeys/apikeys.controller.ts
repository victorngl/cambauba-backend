import { Controller, Get, Post, Body, Param, Delete, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { ApiKeys, Prisma } from '@prisma/client';
import { ApiExcludeController } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

@ApiExcludeController(true)
@Controller('apikeys')
export class ApikeysController {
  constructor(private readonly apikeysService: ApikeysService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    
    ) {

   }

  @Post()
  async create(@Body() createApikeyDto: CreateApikeyDto) {
    try {
      const user = await this.usersService.user({ id: createApikeyDto.ownerId })

      if(!user) {
        throw new HttpException("Usuário nao existe", HttpStatus.NOT_FOUND);
      }
      
      const payload = { email: user.email }

      const token = await this.authService.tokenGeneretor(payload, createApikeyDto.expire);

      const createApi =  {
        name: createApikeyDto.name,
        token: token.access_token,
        owner: {
          connect: {
            id: createApikeyDto.ownerId
          }
        } ,
        
      }
      
      return this.apikeysService.createApiKey(createApi)
    }
    catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get()
  findAll() {
    return this.apikeysService.getKeys({ skip: 0 });
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.ApiKeysWhereUniqueInput) {
    return this.apikeysService.getKey({ id: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.ApiKeysWhereUniqueInput) {
    
      return this.apikeysService.deleteApiKey({ id: +id });
    
  
  }
}
