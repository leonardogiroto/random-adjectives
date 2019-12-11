import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Question } from './question.interface';
import { questions } from './questions';

@Injectable()
export class QuestionsService {

  getQuestions(): Array<Question> {
    const randomQuestions = this._getRandomQuestions(questions, 10);
    return randomQuestions.map(question => {
      return {
        'id': question.id,
        'text': question.text,
        'answers': question.answers.map(answer => {
          return {
            'text': answer.text
          };
        })
      };
    });
  }

  getAnswerScore(questionId: string, answerIndex: number): number {
    const question = questions.find(q => q.id === questionId);

    if (!question) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return question.answers[
      answerIndex
    ].score;
  }

  getPresentSentenceByScore(score: number): { sentence: string } {
    if (score > 5 && score <= 10) {
      return {
        'sentence': `
          (substantivo) _______ relativamente _______, _______ e arborizado, destinado à _________.
          <br><br>
          (substantivo) __________; o que _______; ______________.
          <br><br>
          (action) To ____ by _______ on one ____.
          <br><br>
          (noun) The ______ of ________ in each ___________ hours; the ____ from ______ to _______.`
      };
    } else if (score > 10 && score <= 25) {
      return {
        'sentence': `
          (substantivo) Terreno relativamente _______, _______ e arborizado, destinado à _________.
          <br><br>
          (substantivo) __________; o que distrai; ______________.
          <br><br>
          (action) To ____ by _______ on one foot
          <br><br>
          (noun) The period of ________ in each twenty-four hours; the ____ from ______ to _______.`
      };
    } else if (score > 25 && score <= 30) {
      return {
        'sentence': `
          (substantivo) Terreno relativamente _______, cercado e arborizado, destinado à _________.
          <br><br>
          (substantivo) Passatempo; o que distrai; ______________.
          <br><br>
          (action) To move by _______ on one foot
          <br><br>
          (noun) The period of ________ in each twenty-four hours; the time from ______ to sunrise.`
      };
    } else {
      return {
        'sentence': `
          (substantivo) Terreno relativamente extenso, cercado e arborizado, destinado à recreação.
          <br><br>
          (substantivo) Passatempo; o que distrai; entretenimento.
          <br><br>
          (action) To move by jumping on one foot
          <br><br>
          (noun) The period of darkness in each twenty-four hours; the time from sunset to sunrise.`
      };
    }
  }

  getMeetingSentenceByScore(score: number): { sentence: string } {
    if (score > 5 && score <= 10) {
      return {
        'sentence': `
          (substantivo) ____ aberta de uma ____ ou ________ similar a uma _______, localizada em _______ superiores ao ______.<br>
          Trata-se de um _____ exposto ao ar _____, costuma ser usada como ____ de _____ e ________.
          <br><br>
          (noun) A ____ where an ______, ____________, ________, etc. works.
          <br><br>
          (nome) Nome ____ que significa "_____ da _______ dos homens" (___, homem + nhan, ______ + aba, _____),
          numa referência a uma _________ da região que ________ as pessoas que vinham de _____ a ______ e prosseguir a __.`
      };
    } else if (score > 10 && score <= 25) {
      return {
        'sentence': `
          (substantivo) Área aberta de uma ____ ou ________ similar a uma _______, localizada em _______ superiores ao térreo.<br>
          Trata-se de um lugar exposto ao ar _____, costuma ser usada como área de _____ e ________.
          <br><br>
          (noun) A room where an ______, ____________, ________, etc. works.
          <br><br>
          (nome) Nome ____ que significa "lugar da _______ dos homens" (abá, homem + nhan, ______ + aba, lugar),
          numa referência a uma _________ da região que obrigava as pessoas que vinham de _____ a descer e prosseguir a pé.`
      };
    } else if (score > 25 && score <= 30) {
      return {
        'sentence': `
          (substantivo) Área aberta de uma casa ou ________ similar a uma varanda, localizada em _______ superiores ao térreo.<br>
          Trata-se de um lugar exposto ao ar livre, costuma ser usada como área de _____ e ________.
          <br><br>
          (noun) A room where an artist, ____________, ________, etc. works.
          <br><br>
          (nome) Nome ____ que significa "lugar da _______ dos homens" (abá, homem + nhan, correr + aba, lugar),
          numa referência a uma cachoeira da região que obrigava as pessoas que vinham de _____ a descer e prosseguir a pé.`
      };
    } else {
      return {
        'sentence': `
          (substantivo) Área aberta de uma casa ou edifício similar a uma varanda, localizada em andares superiores ao térreo.<br>
          Trata-se de um lugar exposto ao ar livre, costuma ser usada como área de lazer e descanso.
          <br><br>
          (noun) A room where an artist, photographer, sculptor, etc. works.
          <br><br>
          (nome) Nome tupi que significa "lugar da corrida dos homens" (abá, homem + nhan, correr + aba, lugar),
          numa referência a uma cachoeira da região que obrigava as pessoas que vinham de canoa a descer e prosseguir a pé.`
      };
    }
  }

  private _getRandomQuestions(array: Array<Question>, amount: number): Array<Question> {
    const result = new Array(amount);
    let length = array.length;
    const taken = new Array( length );

    while (amount--) {
      const x = Math.floor(Math.random() * length);
      result[amount] = array[x in taken ? taken[x] : x];
      taken[x] = --length in taken ? taken[ length ] : length;
    }
    return result;
}
}
