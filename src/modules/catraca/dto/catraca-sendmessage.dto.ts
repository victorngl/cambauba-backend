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
  @IsNotEmpty()
  @IsString()
  studentName: string;
  @ApiProperty({
    example: '2013-10-10 14:25:00',
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
