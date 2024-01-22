import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMakeNewFilmMutation,
  useUpdateFilmByIdMutation,
} from "../../services/film/api";
import { PrimaryButton } from "..";
import { FaTimes } from "react-icons/fa";
import { IFilm } from "../../interfaces/IFilm";
import { HTTP } from "../../enums/HttpMethodsEnum";
import { formFields, schema } from "./schema";

export interface IFilmFormProps {
  handleMakeFilmFormVisibility: () => void;
  filmToUpdate?: IFilm;
}

const MakeFilmForm = ({
  handleMakeFilmFormVisibility,
  filmToUpdate,
}: IFilmFormProps) => {
  const {
    filmId: idToUpdate,
    coverImg: oldCoverImg,
    title: oldTitle,
    nationOfProduction: oldNationOfProduction,
    plot: oldPlot,
    rating: oldRating,
    funFacts: oldFunFacts,
  } = filmToUpdate ?? {};

  const [createFilm] = useMakeNewFilmMutation();
  const [updateFilm] = useUpdateFilmByIdMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    defaultValues: {
      coverImg: oldCoverImg,
      title: oldTitle,
      nationOfProduction: oldNationOfProduction,
      plot: oldPlot,
      rating: oldRating,
      funFacts: oldFunFacts,
    },
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    if (!idToUpdate) {
      await createFilm(data)
        .unwrap()
        .then((payload) => console.log(payload))
        .catch((e) => console.log(e));
      handleMakeFilmFormVisibility();
      return;
    }
    await updateFilm({ id: idToUpdate, body: data })
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((e) => console.log(e));
    handleMakeFilmFormVisibility();
  };

  return (
    <div className="MakeFilmForm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method={filmToUpdate ? HTTP.PUT : HTTP.POST}
      >
        <div className="mb-3">
          <label htmlFor="coverImg" className="form-label">
            Cover Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="coverImg"
            placeholder="URL dell'immagine di copertina"
            {...register("coverImg")}
          />
          {errors.coverImg && (
            <p className="text-danger">{`${errors.coverImg.message}`}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Titolo del film"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-danger">{`${errors.title.message}`}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="nationOfProduction" className="form-label">
            Nation of Production
          </label>
          <input
            type="text"
            className="form-control"
            id="nationOfProduction"
            placeholder="Nazione di produzione"
            {...register("nationOfProduction")}
          />
          {errors.nationOfProduction && (
            <p className="text-danger">{`${errors.nationOfProduction.message}`}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="plot" className="form-label">
            Plot
          </label>
          <textarea
            className="form-control"
            id="plot"
            placeholder="Trama del film"
            {...register("plot")}
          />
          {errors.plot && (
            <p className="text-danger">{`${errors.plot.message}`}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>

          <input
            type="number"
            step="0.1"
            className="form-control"
            id="rating"
            placeholder="Valutazione del film (0-5)"
            {...register("rating")}
          />
          {errors.rating && (
            <p className="text-danger">{`${errors.rating.message}`}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="funFacts" className="form-label">
            Fun Facts
          </label>
          <textarea
            className="form-control"
            id="funFacts"
            placeholder="Curiosità divertenti sul film"
            {...register("funFacts")}
          />
          {errors.funFacts && (
            <p className="text-danger">{`${errors.funFacts.message}`}</p>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <input
            type="submit"
            value={filmToUpdate ? "Edit" : "Create"}
            className="btn btn-success"
          />
          <PrimaryButton
            onClickFunction={handleMakeFilmFormVisibility}
            style={["btnDanger"]}
            icon={FaTimes}
            content={"Close"}
          />
        </div>
      </form>
    </div>
  );
};

export default MakeFilmForm;

//TODO: componente inputs
