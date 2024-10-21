export interface Country {
  id: number;
  countryName: string;
  description: string;
  image: string; // Assuming this is a single image URL, not an array
  gold_total: number | null; // Adjust based on your API response
  silver_total: number | null; // Adjust based on your API response
  bronze_total: number | null; // Adjust based on your API response
  rankValue: number | null; // Can be null
  ownSports: Sport[]; // Updated from sports to ownSports based on your response
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
