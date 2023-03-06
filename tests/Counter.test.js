import { render } from "@testing-library/react";
import BookPage from "../src/pages/BookPage";

describe("testing input counter functions", () => {
  test("searchin for input", () => {
    const { getByTestId } = render(<BookPage />);

    expect(getByTestId("counter")).toBeTruthy();
  });
});
