export interface Country{
    id: number,
    country_name: string,
    description: string,
    image: string,
    gold: number,
    silver: number,
    bronze: number,
    rank: number,
    sports: Sport[]
}
export interface Sport {
  name: string;
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
}
export interface InfoState{
  country: Country | null
}
 