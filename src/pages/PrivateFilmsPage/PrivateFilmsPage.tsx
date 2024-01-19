import { useCallback, useState } from "react";
import { PrimaryButton } from "../../components";
import { FaPlus } from "react-icons/fa";
import MakeFilmForm from "../../components/MakeFilmForm";
import { useRetrieveAllFilmsQuery } from "../../services/film/api";

const PrivateFilmsPage = () => {
  const [isMakeFormVisible, setIsMakeFormVisible] = useState(false);
  const {
    data: films,
    isLoading,
    isFetching,
    isError,
  } = useRetrieveAllFilmsQuery();
  const handleMakeFilmFormVisibility = useCallback(() => {
    setIsMakeFormVisible(!isMakeFormVisible);
  }, [isMakeFormVisible]);
  return (
    <div>
      <h3 className="text-my-primary">PrivateFilmPage</h3>
      {isMakeFormVisible ? (
        <MakeFilmForm
          handleMakeFilmFormVisibility={handleMakeFilmFormVisibility}
        />
      ) : (
        <div>
          <PrimaryButton
            onClickFunction={handleMakeFilmFormVisibility}
            icon={FaPlus}
            content={"make a film"}
            style={["primary"]}
          />
          <div>
            {isError && <span className="text-red fs-1">ERROR</span>}
            {isFetching || isLoading ? (
              <span className="loader"></span>
            ) : (
              films?.map((film, index) => (
                <ul key={index}>
                  <li>{film.title}</li>
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
