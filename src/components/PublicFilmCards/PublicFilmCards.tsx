import { useRetrieveAllFilmsQuery } from '../../services/film/api';
import MainLoader from '../MainLoader';
import PublicFilmCard from '../PublicFilmCard';

const PublicFilmCards = () => {
  const {
    data: films,
    isLoading,
    isFetching,
    isError,
  } = useRetrieveAllFilmsQuery();
  if (isError) {
    return <span className="txt-danger">Error</span>;
  } else if (isLoading || isFetching) {
    return <MainLoader />;
  } else
    return (
      <div className="row">
        {films?.map((film) => (
          <div key={film.filmId} className="col-4">
            <PublicFilmCard film={film} />
          </div>
        ))}
      </div>
    );
};

export default PublicFilmCards;
