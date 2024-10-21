export interface Country{
    id: number,
    countryName: string,
    description: string,
    image: string[],
    gold: number,
    silver: number,
    bronze: number,
    rankValue: number,
    sports: Sport[]
}
export interface Sport {
  id: number
  name: string;
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
}
export interface InfoState{
  country: Country | null
}
export interface MessageState {
  message: string
}
