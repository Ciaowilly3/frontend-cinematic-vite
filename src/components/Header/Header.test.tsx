import Header from "./Header";
import { render } from "@testing-library/react";

describe("Header", () => {
  test("renders logo", () => {
    const { getByTestId } = render(<Header />);
    const pippo = getByTestId("header");
    expect(pippo).toBeDefined();
  });
});
