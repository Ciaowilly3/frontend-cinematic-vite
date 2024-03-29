import { useCallback, useState } from 'react';
import { PrimaryButton } from '../../components';
import { FaPlus } from 'react-icons/fa';
import FilmForm from '../../components/FilmForm';
import { useRetrieveAllFilmsQuery } from '../../services/film/api';
import { IFilm } from '../../interfaces/IFilm';
import PrivateFilmCard from '../../components/PrivateFilmCard';
import GenreInput from '../../components/GenreInput';
import MainLoader from '../../components/MainLoader';

const PrivateFilmsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filmToUpdate, setFilmToUpdate] = useState<IFilm | undefined>(
    undefined
  );
  const { data: films, isFetching, isError } = useRetrieveAllFilmsQuery();

  const handleFilmFormVisibility = useCallback(
    (film?: IFilm) => {
      film ? setFilmToUpdate(film) : setFilmToUpdate(undefined);
      setIsFormVisible(!isFormVisible);
    },
    [isFormVisible]
  );

  return (
    <div>
      <h3 className="text-my-primary">PrivateFilmPage</h3>
      {isFormVisible ? (
        <FilmForm
          handleFilmFormVisibility={() => handleFilmFormVisibility()}
          filmToUpdate={filmToUpdate}
        />
      ) : (
        <div>
          <div className="my-3 d-flex justify-content-between align-items-center">
            <PrimaryButton
              onClickFunction={() => handleFilmFormVisibility()}
              icon={FaPlus}
              content={'Create a film'}
              style={['btnPrimary']}
            />
            <GenreInput />
          </div>
          <div>
            {isError ? (
              <span className="text-red fs-1">ERROR</span>
            ) : isFetching ? (
              <MainLoader />
            ) : (
              films?.map((film) => (
                <PrivateFilmCard
                  key={film.filmId}
                  film={film}
                  handleFilmFormVisibility={() =>
                    handleFilmFormVisibility(film)
                  }
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateFilmsPage;
