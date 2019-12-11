import { Injectable } from '@nestjs/common';
import { Adjectives } from './adjectives';

@Injectable()
export class AdjectivesService {

  public getAdjectives(amount: number = 5): Array<string> {
    if (amount < 1) { amount = 5; }
    else if (amount > 100) { amount = 100; }
    amount = Math.floor(amount);

    const result = new Array(amount);
    let length = Adjectives.length;
    const taken = new Array( length );

    while (amount--) {
      const x = Math.floor(Math.random() * length);
      result[amount] = Adjectives[x in taken ? taken[x] : x];
      taken[x] = --length in taken ? taken[ length ] : length;
    }

    return result.sort((a, b) => {
      if (a > b) { return 1; }
      else if (a < b) { return -1; }
      return 0;
    });
  }

}
