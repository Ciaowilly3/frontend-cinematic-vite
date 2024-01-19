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
  const handleMakeFilmFormVisibility = useCallback(() => {
    setIsMakeFormVisible(!isMakeFormVisible);
  }, [isMakeFormVisible]);
  const handleEditFilmButtonClick = useCallback((film: IFilm) => {
    setFilmToUpdate(film);
    handleMakeFilmFormVisibility();
  }, []);
  return (
    <div>
      <h3 className="text-my-primary">PrivateFilmPage</h3>
      {isMakeFormVisible ? (
        <MakeFilmForm
          handleMakeFilmFormVisibility={handleMakeFilmFormVisibility}
          filmToUpdate={filmToUpdate}
        />
      ) : (
        <div>
          <PrimaryButton
            onClickFunction={handleMakeFilmFormVisibility}
            icon={FaPlus}
            content={"make a film"}
            style={["btnPrimary"]}
          />
          <div>
            {isError && <span className="text-red fs-1">ERROR</span>}
            {isFetching || isLoading ? (
              <span className="loader"></span>
            ) : (
              films?.map((film, index) => (
                <ul key={index}>
                  <li>
                    {film.title}{" "}
                    <PrimaryButton
                      onClickFunction={() => handleEditFilmButtonClick(film)}
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
