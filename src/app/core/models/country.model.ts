export interface Country {
  name: string,
  nameEnglish?: string,
  continents?: string[],
  countryCode?: string,
  borderingCountries: string[],
  currency: string,
  flagUrl: string,
  capital: string,
  languages: string[],
  phoneAreaCode: number,
  size: number,
  population: number
}
