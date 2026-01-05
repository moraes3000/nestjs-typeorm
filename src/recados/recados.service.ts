import { Injectable } from '@nestjs/common';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId: 1;
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

  create(createRecadoDto: any) {
    this.lastId++;
    const id = this.lastId;
    const newRecado = {
      id,
      ...createRecadoDto,
    };
    this.recados.push(newRecado);

    return newRecado;
  }

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    return this.recados.find(item => item.id === id);
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    return `This action updates a #${id} recado`;
  }

  remove(id: number) {
    return `This action removes a #${id} recado`;
  }
}
