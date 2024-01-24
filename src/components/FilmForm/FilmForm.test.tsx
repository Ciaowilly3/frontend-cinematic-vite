import { render, fireEvent } from "@testing-library/react";
import FilmForm from "./index";
import { IFilmFormProps } from "./FilmForm";

describe("Film Form", () => {
  test("", () => {
    const prop: IFilmFormProps = {
      handleFilmFormVisibility: jest.fn(),
    } as const;
    // const { form } = render(<MakeFilmForm {...prop}/>);
  });
});
