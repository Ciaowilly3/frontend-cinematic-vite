import { IFilm } from "../../interfaces/IFilm";
import "./PublicFilmCard.css";

type PublicFilmCardProps = {
  film: IFilm;
};

const PublicFilmCard = ({ film }: PublicFilmCardProps) => {
  return (
    <div className="film-card">
      <div className="card">
        <div className="card-content">
          <div className="card-front">
            <img src={film.coverImg} alt={film.title} />
          </div>
          <div className="card-back">
            <h3>{film.title}</h3>

            <p>{film.plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicFilmCard;
