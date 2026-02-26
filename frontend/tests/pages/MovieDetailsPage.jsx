import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MovieDetailsPage } from "./MovieDetailsPage";
import { vi } from "vitest";

beforeEach(() => {
  vi.spyOn(global, "fetch");
  localStorage.setItem("token", "fake-token");
});

afterEach(() => {
  vi.restoreAllMocks();
});

const mockMovie = {
  _id: "123",
  title: "Inception",
  genre: "Sci-Fi",
  director: "Christopher Nolan",
  releaseYear: 2010,
  description: "Dreams within dreams",
  image: "image.jpg",
};

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/movies/123"]}>
      <Routes>
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
}

test("loads and displays movie details", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ movie: mockMovie }),
  });

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText("Inception")).toBeInTheDocument()
  );

  expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
  expect(screen.getByText("2010")).toBeInTheDocument();
});

test("adds movie to watchlist", async () => {
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movie: mockMovie }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Movie added to watchlist" }),
    });

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText("Inception")).toBeInTheDocument()
  );

  const button = screen.getByText("Add to Watchlist");
  fireEvent.click(button);

  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/moviesToWatch/123"),
      expect.objectContaining({ method: "POST" })
    )
  );
});

test("marks movie as watched", async () => {
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movie: mockMovie }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Marked as watched" }),
    });

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText("Inception")).toBeInTheDocument()
  );

  const button = screen.getByText("Mark as Watched");
  fireEvent.click(button);

  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/moviesWatched/123"),
      expect.objectContaining({ method: "POST" })
    )
  );
});