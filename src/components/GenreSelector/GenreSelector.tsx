import { useRetrieveAllGenresQuery } from '../../services/genre/api';
import { useState } from 'react';
import { GenreDto } from '../../interfaces/IGenre';
import MainLoader from '../MainLoader';

type GenreElement = GenreDto | { genre: { genreName: string } };

type GenreSelectorProps = {
  onGenresChange: (genres: any) => void;
};

const GenreSelector = ({ onGenresChange }: GenreSelectorProps) => {
  const [selectedGenres, setSelectedGenres] = useState<GenreElement[]>([]);
  const { data: genres, isError, isFetching } = useRetrieveAllGenresQuery();

  const handleCheckboxChange = (genreName: string, checked: boolean) => {
    const updatedGenres = checked
      ? [...selectedGenres, { genre: { genreName } }]
      : selectedGenres.filter(
          (genre) => 'genreName' in genre && genre.genreName !== genreName
        );

    setSelectedGenres(updatedGenres);
    onGenresChange(updatedGenres);
  };

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
