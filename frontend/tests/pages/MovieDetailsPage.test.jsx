import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MovieDetailsPage } from "../../src/pages/MovieDetailsPage";
import { vi } from "vitest";
import { getCurrentUser } from "../../src/services/users";

vi.mock("../../src/services/users");

beforeEach(() => {
  vi.spyOn(globalThis, "fetch");
  window.localStorage.setItem("token", "fake-token");
  window.alert = vi.fn();

  getCurrentUser.mockResolvedValue({
    user: {
      username: "testuser",
      profile_image: "avatar.jpg",
    },
    token: "fake-token",
  });
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
  otherReviews = [],
} = {}) {
  fetch
    // Movie details
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movie: mockMovie }),
    })

    // Other reviews
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reviews: otherReviews }),
    })

    // Watchlist
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movies: watchlistMovies }),
    })

    // Watched
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ movies: watchedMovies }),
    });
}

test("loads and displays movie details", async () => {
  mockInitialFetches();

  renderWithRouter();

  expect(await screen.findByText("Inception")).toBeInTheDocument();
  expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
  expect(screen.getByText("2010")).toBeInTheDocument();
  expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
  expect(screen.getByText("Dreams within dreams")).toBeInTheDocument();
});

test("shows correct initial button states when not in watchlist or watched", async () => {
  mockInitialFetches();

  renderWithRouter();

  await screen.findByText("Inception");

  expect(screen.getByText("Add to Watchlist")).toBeInTheDocument();
  expect(screen.getByText("Mark as Watched")).toBeInTheDocument();
});

test("adds movie to watchlist", async () => {
  mockInitialFetches();

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "Movie added to watchlist" }),
  });

  renderWithRouter();

  await screen.findByText("Inception");

  fireEvent.click(screen.getByText("Add to Watchlist"));

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

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "Removed from watchlist" }),
  });

  renderWithRouter();

  await screen.findByText(/In Watchlist/);

  fireEvent.click(screen.getByText(/In Watchlist/));

  await waitFor(() =>
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("/moviesToWatch/123"),
      expect.objectContaining({ method: "DELETE" })
    )
  );
});

test("marks movie as watched", async () => {
  mockInitialFetches();

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "Marked as watched" }),
  });

  renderWithRouter();

  await screen.findByText("Inception");

  fireEvent.click(screen.getByText("Mark as Watched"));

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

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "Removed from watched" }),
  });

  renderWithRouter();

  await screen.findByText(/Watched/);

  fireEvent.click(screen.getByText(/Watched/));

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
        user_id: {
          username: "testuser",
          profile_image: "avatar.jpg",
        },
      },
    ],
  });

  renderWithRouter();

  expect(await screen.findByText("Your Review")).toBeInTheDocument();

  const reviewCard = screen.getByText("Your Review").closest("div");

  expect(reviewCard).toHaveTextContent("W film");
  expect(reviewCard).toHaveTextContent("4.5");
});