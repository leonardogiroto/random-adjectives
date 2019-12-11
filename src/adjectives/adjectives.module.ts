import { Module } from '@nestjs/common';
import { AdjectivesService } from './adjectives.service';
import { AdjectivesController } from './adjectives.controller';

@Module({
  controllers: [AdjectivesController],
  providers: [AdjectivesService],
})
export class AdjectivesModule { }
