import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { filmApi, useMakeNewFilmMutation } from "../../services/film/api";
import { IFilm } from "../../interfaces/IFilm";

const schema = z.object({
  coverImg: z
    .string()
    .url({ message: "Inserisci un URL valido per l'immagine di copertina" }),
  title: z.string().min(1, { message: "Il titolo del film è obbligatorio" }),
  nationOfProduction: z
    .string()
    .min(1, { message: "nation of production is mandatory" }),
  plot: z.string().min(1, { message: "plot is mandatory" }),
  rating: z.coerce
    .number()
    .min(0)
    .max(5, { message: "Il rating deve essere compreso tra 0 e 5" })
    .default(0),
  funFacts: z.string(),
});

type formFields = z.infer<typeof schema>;

interface IProps {
  handleMakeFilmFormVisibility: () => void;
}

const MakeFilmForm = ({ handleMakeFilmFormVisibility }: IProps) => {
  const [createUser, second] = useMakeNewFilmMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    await createUser(data)
      .unwrap()
      .then(() => console.log("created"))
      .catch((e) => console.log(e));
    console.log("vediamo cos è " + second);
    handleMakeFilmFormVisibility();
  };

  return (
    <div className="MakeFilmForm">
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
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
        <input type="submit" className="btn btn-success" />
      </form>
    </div>
  );
};

export default MakeFilmForm;
