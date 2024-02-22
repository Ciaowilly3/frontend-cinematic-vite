import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useMakeNewFilmMutation,
  useUpdateFilmByIdMutation,
} from '../../services/film/api';
import { PrimaryButton } from '..';
import { FaTimes } from 'react-icons/fa';
import { FilmDto, FilmGenre, IFilm } from '../../interfaces/IFilm';
import { HTTP } from '../../enums/HttpMethodsEnum';
import { filmFormFields, formFields, schema } from './schema';
import * as _ from 'lodash';
import FormInput from '../FormInputs/FormInput';
import GenreSelector from '../GenreSelector';
import { useCallback, useState } from 'react';
import MainLoader from '../MainLoader';

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

  const [createFilm, { isError, isLoading }] = useMakeNewFilmMutation();
  const [updateFilm, { isError: updateError, isLoading: updateLoading }] =
    useUpdateFilmByIdMutation();
  const [genres, setGenres] = useState<FilmGenre>([]);

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
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    const film: FilmDto = { ...data, filmGenre: genres };
    console.log(film);

    const res = !idToUpdate
      ? await createFilm(film)
      : await updateFilm({ id: idToUpdate, body: film });
    if ('data' in res) handleFilmFormVisibility();
  };
  const handleGenresChange = useCallback(
    (genres: FilmGenre) => {
      setGenres(genres);
    },
    [genres]
  );

  if (isLoading || updateLoading) {
    return <MainLoader />;
  }
  if (isError || updateError) {
    return <p className="text-danger">An error occured</p>;
  }
  return (
    <div className="FilmForm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method={filmToUpdate ? HTTP.PUT : HTTP.POST}
        className="gap-3"
      >
        {filmFormFields.map((field) => (
          <FormInput
            key={_.uniqueId()}
            step={field.step ?? undefined}
            type={field.type}
            style={field.style}
            id={field.id}
            placeholder={field.placeholder}
            label={field.label}
            error={errors[field.name]}
            register={register}
          />
        ))}
        <GenreSelector
          onGenresChange={handleGenresChange}
          genresProp={genres}
        />
        <div className="d-flex justify-content-between">
          <input
            type="submit"
            value={filmToUpdate ? 'Edit' : 'Create'}
            className="btn btn-success"
          />
          <PrimaryButton
            onClickFunction={handleFilmFormVisibility}
            style={['btnDanger']}
            icon={FaTimes}
            content={'Close'}
          />
        </div>
      </form>
    </div>
  );
};

export default FilmForm;
