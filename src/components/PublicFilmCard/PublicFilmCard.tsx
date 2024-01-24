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
            {/* Display the film image or content here */}
            <img src={film.coverImg} alt={film.title} />
          </div>
          <div className="card-back">
            {/* Display additional information on hover */}
            <h3>{film.title}</h3>
            {/* Add more film details as needed */}
            <p>{film.plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicFilmCard;
