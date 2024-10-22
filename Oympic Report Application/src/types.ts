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
    roles: string[]
}

export interface Sport {
  id: number;
  sportName: string; // Updated from name to sportName to match your API
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
}

export interface InfoState {
  country: Country | null;
}

export interface MessageState {
  message: string;
}
