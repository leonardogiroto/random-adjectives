import { Controller, Get, Query } from '@nestjs/common';
import { AdjectivesService } from './adjectives.service';

@Controller('adjectives')
export class AdjectivesController {

  constructor(
    private _adjectivesService: AdjectivesService
  ) { }

  @Get()
  getRandomAdjectives(
    @Query('amount') amount: number
  ): Array<string> {
    return this._adjectivesService.getAdjectives(amount);
  }

}
