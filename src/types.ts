// export interface Country{
//     id: number,
//     countryName: string,
//     description: string,
//     image: string[],
//     gold: number,
//     silver: number,
//     bronze: number,
//     rankValue: number,
//     roles: string[] | null,
//     images: string[],
//     sport: Sport
// }
export interface Country{
  ownSports: any;
  id: number,
  countryName: string,
  description: string,
  // image: string[],
  // gold: number,
  // silver: number,
  // bronze: number,
  // rankValue: number,
  // roles: string[] | null,
  images: string[],
  sport: Sport
}

// export interface Sport {
//   id: number;
//   sportName: string; // Updated from name to sportName to match your API
//   gold_medals: number;
//   silver_medals: number;
//   bronze_medals: number;
//   images: string[]
// }

export interface Sport {
  id: number;
  sportName: string; // Updated from name to sportName to match your API
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
  // images: string[]
}
export interface InfoState {
  country: Country | null;
}

export interface MessageState {
  message: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: Role;
  //new
  images: string[]; 
  
}
export interface Role {
  id: number;
  roles: string;
}
export interface RegisterUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  images: string[];
}
//new
interface Comment {
  id: number;
  username: string;
  text: string;
  images: string[]; 
}


