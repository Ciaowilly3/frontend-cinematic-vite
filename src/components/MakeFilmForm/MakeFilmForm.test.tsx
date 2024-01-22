import { render, fireEvent } from "@testing-library/react";
import MakeFilmForm from "./index";
import { IFilmFormProps } from "./MakeFilmForm";

describe("Film Form", () => {
  test("", () => {
    const prop: IFilmFormProps = {
      handleMakeFilmFormVisibility: jest.fn(),
    } as const;
    // const { form } = render(<MakeFilmForm {...prop}/>);
  });
});
