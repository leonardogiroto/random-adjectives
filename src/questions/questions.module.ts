import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule { }
