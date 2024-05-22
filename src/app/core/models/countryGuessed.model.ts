export interface InformationGuess {
  field: string;
  informations: string[];
  color: string;
  direction?: string | null;
}

export interface CountryGuessed {
  name: string;
  success: boolean;
  countryGuessed: string;
  countryGuessEnglish: string;
  informationGuesses: InformationGuess[];
}
