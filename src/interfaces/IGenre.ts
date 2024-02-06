export type GenreDto = {
  genreName: string;
};

export interface IGenre {
  genreId: number;
  genre: string;
}

export type IGenreDTOs = GenreDto[];
export type IGenres = IGenre[];
