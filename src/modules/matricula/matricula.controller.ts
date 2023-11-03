import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { Prisma } from '@prisma/client';
import { Permissions } from '../auth/permissions/permissions.decorator';


@Controller('matricula')
@Permissions(['agendaedu-send-notification'])
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}

  @Post()
  create(@Body() createMatriculaDto: Prisma.MatriculaCreateInput) {
    return this.matriculaService.create(createMatriculaDto);
  }

  @Get()
  findAll() {
    return this.matriculaService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matriculaService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatriculaDto: Prisma.MatriculaUpdateInput) {
    return this.matriculaService.update({ where: { id: +id }, data: updateMatriculaDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matriculaService.remove({ id: +id });
  }
}
