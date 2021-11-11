export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: Schedule | null;
  rating: Rating | null;
  weight: number | null;
  network: Network | null;
  webChannel: WebChannel | null;
  dvdCountry: any;
  externals: Externals | null;
  image: Image | null;
  summary: string | null;
  updated: number | null;
  _links: Links | null;
}

export interface Schedule {
  time: string;
  days: string[];
}

export interface Rating {
  average: number | null;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface WebChannel {
  id: number | null;
  name: string | null;
  country: Country | null;
}

export interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export interface Image {
  medium: string | undefined;
  original: string | undefined;
}

export interface Links {
  self: Self;
  previousepisode?: Previousepisode | null;
  nextepisode?: any;
}

export interface Self {
  href: string | null;
}

export interface Previousepisode {
  href: string | null;
}
