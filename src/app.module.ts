import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdjectivesModule } from './adjectives/adjectives.module';

@Module({
  imports: [AdjectivesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
