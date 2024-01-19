export interface IFilm {
  filmId: string;
  coverImg: string;
  title: string;
  nationOfProduction: string;
  plot: string;
  rating: number;
  funFacts: string;
}
export interface IFilmDto {
  coverImg: string;
  title: string;
  nationOfProduction: string;
  plot: string;
  rating: number;
  funFacts: string;
}

export type IFilms = IFilm[];

export interface IDataFilms {
  films: IFilms;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
}
