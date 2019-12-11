import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './question.interface';
import { Sentences } from './sentences.interface';

@Controller('questions')
export class QuestionsController {

  constructor(
    private _questionsService: QuestionsService
  ) { }

  @Get()
  getQuestions(): Array<Question> {
    return this._questionsService.getQuestions();
  }

  @Get('score/:id/:answerIndex')
  getAnswerScore( @Param() params ): number {
    return this._questionsService.getAnswerScore(
      params.id, params.answerIndex
    );
  }

  @Get('sentence/:score')
  getSentencesByScore(
    @Param('score', new ParseIntPipe()) score
  ): Sentences {
    const present = this._questionsService.getPresentSentenceByScore(
      score
    );

    const meeting  = this._questionsService.getMeetingSentenceByScore(
      score
    );

    return {
      'present': present,
      'meeting': meeting
    };
  }
}
