import { GenreDto } from './IGenre';

type genre = {
  genre: GenreDto;
};

export type FilmGenre = genre[];
export interface IFilm {
  filmId: string;
  coverImg: string;
  title: string;
  nationOfProduction: string;
  plot: string;
  rating: number;
  funFacts: string;
  filmGenre: FilmGenre;
}

export type FilmDto = Omit<IFilm, 'filmId'>;

export type IFilms = IFilm[];

export interface IDataFilms {
  films: IFilms;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
}
