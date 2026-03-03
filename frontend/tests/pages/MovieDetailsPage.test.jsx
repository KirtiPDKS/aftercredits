const localStorageMock = (() => {
  let store = {};

  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MovieDetailsPage } from "../../src/pages/MovieDetailsPage";
import { vi } from "vitest";

beforeEach(() => {
  vi.spyOn(globalThis, "fetch");
  window.localStorage.setItem("token", "fake-token");
  window.alert = vi.fn();
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
  averageRating: 4.5,
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

function mockInitialFetches({
  watchlistMovies = [],
  watchedMovies = [],
} = {}) {
  fetch
    // Movie details
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movie: mockMovie }),
    })
    // Watchlist check
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movies: watchlistMovies }),
    })
    // Watched check
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movies: watchedMovies }),
    });
}

test("loads and displays movie details", async () => {
  mockInitialFetches();

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText("Inception")).toBeInTheDocument()
  );

  expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
  expect(screen.getByText("2010")).toBeInTheDocument();
  expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
  expect(screen.getByText("Dreams within dreams")).toBeInTheDocument();
});

test("shows correct initial button states when not in watchlist or watched", async () => {
  mockInitialFetches();

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText("Inception")).toBeInTheDocument()
  );

  expect(screen.getByText("Add to Watchlist")).toBeInTheDocument();
  expect(screen.getByText("Mark as Watched")).toBeInTheDocument();
});

test("adds movie to watchlist", async () => {
  mockInitialFetches();

  // Mock POST toggle
  fetch.mockResolvedValueOnce({
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
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/moviesToWatch/123"),
      expect.objectContaining({ method: "POST" })
    )
  );
});

test("removes movie from watchlist if already added", async () => {
  mockInitialFetches({
    watchlistMovies: [{ movie_id: "123" }],
  });

  // Mock DELETE toggle
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "Removed from watchlist" }),
  });

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText(/In Watchlist/)).toBeInTheDocument()
  );

  const button = screen.getByText(/In Watchlist/);
  fireEvent.click(button);

  await waitFor(() =>
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/moviesToWatch/123"),
      expect.objectContaining({ method: "DELETE" })
    )
  );
});

test("marks movie as watched", async () => {
  mockInitialFetches();

  // Mock POST toggle
  fetch.mockResolvedValueOnce({
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
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/moviesWatched/123"),
      expect.objectContaining({ method: "POST" })
    )
  );
});

test("removes movie from watched list if already watched", async () => {
  mockInitialFetches({
    watchedMovies: [
      {
        _id: "watched1",
        movie_id: { _id: "123" },
        rating: 4,
        review: "Epic Chungus movie",
        createdAt: new Date().toISOString(),
      },
    ],
  });

  // Mock DELETE toggle
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "Removed from watched" }),
  });

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText(/Watched/)).toBeInTheDocument()
  );

  const button = screen.getByText(/Watched/);
  fireEvent.click(button);

  await waitFor(() =>
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/moviesWatched/123"),
      expect.objectContaining({ method: "DELETE" })
    )
  );
});

test("displays existing review if movie is already reviewed", async () => {
  mockInitialFetches({
    watchedMovies: [
      {
        _id: "watched1",
        movie_id: { _id: "123" },
        rating: 4.5,
        review: "W film",
        createdAt: new Date().toISOString(),
      },
    ],
  });

  renderWithRouter();

  await waitFor(() =>
    expect(screen.getByText("Your Review")).toBeInTheDocument()
  );

  const reviewCard = screen.getByText("Your Review").closest(".card");

    expect(reviewCard).toBeInTheDocument();
    expect(reviewCard).toHaveTextContent("W film");
    expect(reviewCard).toHaveTextContent("4.5");    
});