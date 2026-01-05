import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'obrigatorio texto',
  })
  @IsNotEmpty()
  readonly texto: string;

  @IsString()
  readonly de: string;

  @IsString()
  readonly para: string;
}
