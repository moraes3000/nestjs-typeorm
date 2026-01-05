import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId: number = 1;

  private recados: Recado[] = [
    {
      id: 1,
      texto: 'este e um recado test',
      de: 'joana',
      para: 'eu',
      lido: false,
      data: new Date(),
    },
  ];

  create(createRecadoDto: CreateRecadoDto) {
    this.lastId++;

    const id = this.lastId;
    const newRecado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    this.recados.push(newRecado);

    return newRecado;
  }

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    const recado = this.recados.find(item => item.id === id);
    if (recado) {
      return recado;
    }
    throw new NotFoundException('error do servidor');
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recadoExisteIndex = this.recados.findIndex(item => item.id === id);

    if (recadoExisteIndex < 0) {
      new Error('erro');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} recado`;
  }
}
