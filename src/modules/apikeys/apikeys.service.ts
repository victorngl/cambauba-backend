import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, ApiKeys } from '@prisma/client';
import { Apikey } from './entities/apikey.entity';
import { CreateApikeyDto } from './dto/create-apikey.dto';


@Injectable()
export class ApikeysService {
  constructor(private prisma: PrismaService) { }

  async getKey(
    apiKeysWhereUniqueInput: Prisma.ApiKeysWhereUniqueInput,
  ): Promise<ApiKeys | null> {
    return this.prisma.apiKeys.findUnique({
      where: apiKeysWhereUniqueInput,
    });
  }

  async getKeys(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ApiKeysWhereUniqueInput;
    where?: Prisma.ApiKeysWhereInput;
    orderBy?: Prisma.ApiKeysOrderByWithRelationInput;
  }): Promise<ApiKeys[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.apiKeys.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createApiKey(data: Prisma.ApiKeysCreateInput): Promise<ApiKeys> {
    return this.prisma.apiKeys.create({
      data,
    });
  }

  async updateApiKey(params: {
    where: Prisma.ApiKeysWhereUniqueInput;
    data: Prisma.ApiKeysUpdateInput;
  }): Promise<Apikey> {
    const { where, data } = params;

    return this.prisma.apiKeys.update({
      data,
      where,
    });
  }

  async deleteApiKey(where: Prisma.ApiKeysWhereUniqueInput): Promise<ApiKeys> {

    const apiKeyExits = await this.prisma.apiKeys.findUnique({
      where,
    });

    if (!apiKeyExits) {
      throw new HttpException('ApiKey não existe', HttpStatus.NOT_FOUND);
    }

    return this.prisma.apiKeys.delete({
      where,
    });
  }

}

