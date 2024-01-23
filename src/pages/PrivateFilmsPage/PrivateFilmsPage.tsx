import { useCallback, useState } from "react";
import { PrimaryButton } from "../../components";
import { FaPlus, FaTrash } from "react-icons/fa";
import MakeFilmForm from "../../components/MakeFilmForm";
import {
  useDeleteFilmByIdMutation,
  useRetrieveAllFilmsQuery,
} from "../../services/film/api";
import { FaPencil } from "react-icons/fa6";
import { IFilm } from "../../interfaces/IFilm";

const PrivateFilmsPage = () => {
  const [isMakeFormVisible, setIsMakeFormVisible] = useState(false);
  const [filmToUpdate, setFilmToUpdate] = useState<IFilm | undefined>(
    undefined
  );
  const [deleteFilm] = useDeleteFilmByIdMutation();
  const {
    data: films,
    isLoading,
    isFetching,
    isError,
  } = useRetrieveAllFilmsQuery();

  const handleMakeFilmFormVisibility = useCallback(
    (film?: IFilm) => {
      film ? setFilmToUpdate(film) : setFilmToUpdate(undefined);
      setIsMakeFormVisible(!isMakeFormVisible);
    },
    [isMakeFormVisible]
  );
  return (
    <div>
      <h3 className="text-my-primary">PrivateFilmPage</h3>
      {isMakeFormVisible ? (
        <MakeFilmForm
          handleMakeFilmFormVisibility={() =>
            handleMakeFilmFormVisibility(undefined)
          }
          filmToUpdate={filmToUpdate}
        />
      ) : (
        <div>
          <PrimaryButton
            onClickFunction={() => handleMakeFilmFormVisibility(undefined)}
            icon={FaPlus}
            content={"make a film"}
            style={["btnPrimary"]}
          />
          <div>
            {isError && <span className="text-red fs-1">ERROR</span>}
            {isFetching || isLoading ? (
              <span className="loader"></span>
            ) : (
              films?.map((film) => (
                <ul key={film.filmId}>
                  <li>
                    {film.title}{" "}
                    <PrimaryButton
                      onClickFunction={() => handleMakeFilmFormVisibility(film)}
                      icon={FaPencil}
                      content={"Edit"}
                      style={["btnPrimary"]}
                    />{" "}
                    <PrimaryButton
                      onClickFunction={() => deleteFilm(film.filmId)}
                      icon={FaTrash}
                      content={"Delete"}
                      style={["btnDanger"]}
                    />
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateFilmsPage;
