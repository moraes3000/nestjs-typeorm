import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosModule } from 'src/recados/recados.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // ou 'bdtest' se estiver em docker-compose
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'bdtest',
      autoLoadEntities: true,
      synchronize: true, // ❌ não usar em produção
    }),
    RecadosModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
