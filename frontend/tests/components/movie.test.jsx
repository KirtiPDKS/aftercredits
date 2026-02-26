import { render, screen } from "@testing-library/react";
import Movies from "../../src/components/Movie";
import '@testing-library/jest-dom'

describe("Post", () => {
  test("displays movie information when rendered", () => {
    const testMovie = { _id: "12345", title: "Test Movie", genre: "Comedy", releaseYear:2000,description:"This is a test film", image:"" };
    render(<Movies movie={testMovie} />);

  expect(screen.getByText("Test Movie")).toBeInTheDocument();
  expect(screen.getByText("2000")).toBeInTheDocument();
  expect(screen.getByText("This is a test film")).toBeInTheDocument();
    
  });
});
