export interface IResultModal {
  TOTAL_CHARACTERS: number;
  CORRECT_CHARACTERS: number;
  INCORRECT_CHARACTERS: number;
  TOTAL_WORDS: number;
  CORRECT_WORDS: number;
  INCORRECT_WORDS: number;
  CHARACTER_ACCURACY: number;
  WORDS_ACCURACY: number;
}

export interface IResultFunction {
  result: IResultModal;
  init:Function
}
