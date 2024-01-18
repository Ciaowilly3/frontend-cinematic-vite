import { useCallback, useState } from "react";
import { PrimaryButton } from "../../components";
import { FaPlus } from "react-icons/fa";
import MakeFilmForm from "../../components/MakeFilmForm";

const PrivateFilmsPage = () => {
  const [isMakeFormVisible, setIsMakeFormVisible] = useState(false);

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
        <PrimaryButton
          onClickFunction={handleMakeFilmFormVisibility}
          icon={FaPlus}
          content={"make a film"}
          style={["primary"]}
        />
      )}
    </div>
  );
};

export default PrivateFilmsPage;
