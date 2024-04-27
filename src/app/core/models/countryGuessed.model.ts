export interface InformationGuess {
    field: string;
    informations: string[];
    color: string;
    direction?: string;
}

export interface CountryGuessed {
    name: string;
    success: boolean;
    countryGuessed: string;
    informationGuesses: InformationGuess[];
}
