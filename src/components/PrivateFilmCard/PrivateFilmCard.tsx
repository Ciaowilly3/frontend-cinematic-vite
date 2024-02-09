import { FaPencil } from 'react-icons/fa6';
import { PrimaryButton } from '..';
import { IFilm } from '../../interfaces/IFilm';
import { FaTrash } from 'react-icons/fa';
import { useDeleteFilmByIdMutation } from '../../services/film/api';

type PrivateFilmCardProps = {
  film: IFilm;
  handleFilmFormVisibility: (film: IFilm) => void;
};

const PrivateFilmCard = ({
  film,
  handleFilmFormVisibility,
}: PrivateFilmCardProps) => {
  const [deleteFilm] = useDeleteFilmByIdMutation();
  const {
    coverImg,
    filmId,
    funFacts,
    nationOfProduction,
    plot,
    rating,
    title,
    filmGenre,
  } = film;
  console.log(film);

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={coverImg} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{plot}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                {rating} {nationOfProduction} {funFacts}
                {/* {filmGenre.map((genre) => genre.genre.genreName)} */}
              </small>
            </p>
            <PrimaryButton
              onClickFunction={() => handleFilmFormVisibility(film)}
              icon={FaPencil}
              content={'Edit'}
              style={['btnPrimary']}
            />{' '}
            <PrimaryButton
              onClickFunction={() => deleteFilm(filmId)}
              icon={FaTrash}
              content={'Delete'}
              style={['btnDanger']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateFilmCard;
