import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);

    return this.recadoRepository.save(recado);
  }

  async findAll() {
    return await this.recadoRepository.find();
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({ where: { id } });
    if (recado) {
      return recado;
    }
    throw new NotFoundException('error do servidor');
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.findOne(id);

    // if (recado.de.id !== tokenPayload.sub) {
    //   throw new ForbiddenException('Esse recado não é seu');
    // }

    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    // recado.lido = updateRecadoDto?.lido ?? recado.lido;

    await this.recadoRepository.save(recado);
    return recado;
  }

  async remove(
    id: number,
    // tokenPayload: TokenPayloadDto,
  ) {
    const recado = await this.recadoRepository.findOneBy({ id });

    // if (recado.de.id !== tokenPayload.sub) {
    //   throw new ForbiddenException('Esse recado não é seu');
    // }

    if (!recado) {
      throw new NotFoundException('error do servidor');
    }

    await this.recadoRepository.remove(recado);

    return recado;
  }
}
