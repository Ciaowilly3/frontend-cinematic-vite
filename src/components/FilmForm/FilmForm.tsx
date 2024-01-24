import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMakeNewFilmMutation,
  useUpdateFilmByIdMutation,
} from "../../services/film/api";
import { PrimaryButton } from "..";
import { FaTimes } from "react-icons/fa";
import { IFilm } from "../../interfaces/IFilm";
import { HTTP } from "../../enums/HttpMethodsEnum";
import { filmFormFields, formFields, schema } from "./schema";
import * as _ from "lodash";
import FormInput from "../FormInputs/FormInput";

export interface IFilmFormProps {
  handleFilmFormVisibility: () => void;
  filmToUpdate?: IFilm;
}

const FilmForm = ({
  handleFilmFormVisibility,
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
      handleFilmFormVisibility();
      return;
    }
    await updateFilm({ id: idToUpdate, body: data })
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((e) => console.log(e));
    handleFilmFormVisibility();
  };

  return (
    <div className="FilmForm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method={filmToUpdate ? HTTP.PUT : HTTP.POST}
      >
        {filmFormFields.map((field) => (
          <FormInput
            key={_.uniqueId()}
            type={field.type}
            style={field.style}
            id={field.id}
            placeholder={field.placeholder}
            label={field.label}
            error={errors[field.name]}
            register={register}
          />
        ))}
        <div className="d-flex justify-content-between">
          <input
            type="submit"
            value={filmToUpdate ? "Edit" : "Create"}
            className="btn btn-success"
          />
          <PrimaryButton
            onClickFunction={handleFilmFormVisibility}
            style={["btnDanger"]}
            icon={FaTimes}
            content={"Close"}
          />
        </div>
      </form>
    </div>
  );
};

export default FilmForm;
