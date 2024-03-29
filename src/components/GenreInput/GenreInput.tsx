import React, { FormEvent, useCallback, useState } from "react";
import { GenreDto } from "../../interfaces/IGenre";
import { PrimaryButton } from "..";
import { FaPlus } from "react-icons/fa";
import GenreInputText from "../GenreInputText/GenreInputText";
import { useMakeNewGenreMutation } from "../../services/genre/api";

const GenreInput = () => {
  const [genre, setGenre] = useState<GenreDto>({ genreName: "" });
  const [makeNewGenre] = useMakeNewGenreMutation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGenre((prev) => ({ ...prev, genreName: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      await makeNewGenre(genre)
        .unwrap()
        .then((paylaod) => console.log(paylaod))
        .catch((e: any) => console.log(e));
    },
    [genre]
  );
  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-3">
      <GenreInputText onChangeFunction={(e) => handleChange(e)} />
      <PrimaryButton
        style={["btnSuccess"]}
        content={"create genre"}
        icon={FaPlus}
        type="submit"
      />
    </form>
  );
};

export default GenreInput;
