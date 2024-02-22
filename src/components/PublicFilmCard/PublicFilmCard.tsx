import { IFilm } from '../../interfaces/IFilm';
import './PublicFilmCard.css';

type PublicFilmCardProps = {
  film: IFilm;
};

const PublicFilmCard = ({ film }: PublicFilmCardProps) => {
  return (
    <div className="film-card" data-testid="film-card">
      <div className="card">
        <div className="card-content">
          <div className="card-front" data-testid="card-front">
            <img src={film.coverImg} alt={film.title} />
          </div>
          <div className="card-back" data-testid="card-back">
            <h3>{film.title}</h3>
            <p>{film.plot}</p>
            <p>
              Genres:{' '}
              {film.filmGenre.map((genre) => genre.genre.genreName + ' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicFilmCard;
