import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AdjectivesService } from './adjectives.service';

@Controller('adjectives')
export class AdjectivesController {

  constructor(
    private _adjectivesService: AdjectivesService
  ) { }

  @Get()
  getRandomAdjectives(): Array<string> {
    return this._adjectivesService.getAdjectives();
  }

}
