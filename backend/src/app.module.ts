import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1324',
      database: 'HADASIM',
      autoLoadEntities: true,
      synchronize: true, // רק לפיתוח!
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
