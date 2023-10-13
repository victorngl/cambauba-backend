import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ApikeysService } from './apikeys.service';
import { CreateApikeyDto } from './dto/create-apikey.dto';
import { UpdateApikeyDto } from './dto/update-apikey.dto';
import { Prisma } from '@prisma/client';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('apikeys')
export class ApikeysController {
  constructor(private readonly apikeysService: ApikeysService) { }

  @Post()
  create(@Body() createApikeyDto: CreateApikeyDto) {
    try {
      return this.apikeysService.createApiKey(createApikeyDto)
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

  @Patch(':id')
  update(@Param('id') id: Prisma.ApiKeysWhereUniqueInput, @Body() updateApikeyDto: UpdateApikeyDto) {
    return this.apikeysService.updateApiKey({ where: { id: +id }, data: updateApikeyDto });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.ApiKeysWhereUniqueInput) {
    
      return this.apikeysService.deleteApiKey({ id: +id });
    
  
  }
}
