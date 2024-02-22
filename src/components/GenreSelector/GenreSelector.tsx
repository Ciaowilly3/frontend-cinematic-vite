import { useRetrieveAllGenresQuery } from '../../services/genre/api';
import { useCallback } from 'react';
import MainLoader from '../MainLoader';
import { FilmGenre } from '../../interfaces/IFilm';

type GenreSelectorProps = {
  onGenresChange: (genres: FilmGenre) => void;
  genresProp: FilmGenre;
};

const GenreSelector = ({ onGenresChange, genresProp }: GenreSelectorProps) => {
  const { data: genres, isError, isFetching } = useRetrieveAllGenresQuery();

  const handleCheckboxChange = useCallback(
    (genreName: string, checked: boolean) => {
      const updatedGenres = checked
        ? [...genresProp, { genre: { genreName } }]
        : genresProp.filter(
            (genre) => 'genreName' in genre && genre.genreName !== genreName
          );

      onGenresChange(updatedGenres);
    },
    [genresProp]
  );

  if (isFetching) {
    return <MainLoader />;
  }

  if (isError || !genres) {
    return <p className="text-danger">An error occured in genres fetching</p>;
  }
  return (
    <>
      <h6>choose film's genres</h6>
      {genres.map((genre) => (
        <div key={genre.genreId}>
          <input
            className="form-check-input"
            type="checkbox"
            id={genre.genreName}
            value={genre.genreName}
            onChange={(e) =>
              handleCheckboxChange(genre.genreName, e.target.checked)
            }
          />
          <label className="form-check-label" htmlFor={genre.genreName}>
            {genre.genreName}
          </label>
        </div>
      ))}
    </>
  );
};

export default GenreSelector;
