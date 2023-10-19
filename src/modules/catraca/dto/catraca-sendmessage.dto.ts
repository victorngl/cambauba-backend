import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CatracaMessageDto {
  @ApiProperty({
    example: '10A1234',
    description: `Id que está cadastrado no sistema de catracas.`,
  })
  @IsNotEmpty()
  @IsString()
  studentId: string;
  @ApiProperty({
    example: 'Gustavo Carmo',
    description: `Nome do Aluno`,
  })
  @IsNotEmpty()
  @IsString()
  studentName: string;
  @ApiProperty({
    example: 'YYYY-MM-DD HH:MM:SS',
    description: `Horário e dia em que o aluno passou na catraca.`,
  })
  @IsNotEmpty()
  @IsString()
  schedule: string;
  @ApiProperty({
    example: 'IN',
    description: `IN - para entrada na Escola e OUT para saida da Escola`,
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}
