export interface Country {
  ownSports: any
  id: number
  countryName: string
  description: string
  image: string[]
  gold: number
  silver: number
  bronze: number
  rankValue: number
  roles: string[] | null
  images: string[] | null
  sport: Sport[]
}

export interface Sport {
  id: number
  sportName: string
  gold_medals: number
  silver_medals: number
  bronze_medals: number
  images: string[]
}

export interface InfoState {
  country: Country | null
}

export interface MessageState {
  message: string
}

export interface User {
  id: number
  firstname: string
  lastname: string
  username: string
  email: string
  role: Role
}
export interface Role {
  id: number
  roles: string
}
