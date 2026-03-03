import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getMovies } from "../../src/services/movies";
import { getWatchList } from "../../src/services/moviesToWatch";


// Mocking movies
vi.mock("../../src/services/movies", () => ({
  getMovies: vi.fn(),
}));

vi.mock("../../src/services/moviesToWatch", () => ({
  getWatchList: vi.fn(),
}));

// Mocking components
vi.mock("../../src/components/LogoutButton", () => ({
  default: () => <button>Logout</button>,
}));

vi.mock("../../src/components/Movie", () => ({
  default: ({ movie }) => (
    <article>
      <h3>{movie.title}</h3>
      <p>{movie.releaseYear}</p>
      <p>{movie.description}</p>
    </article>
  ),
}));

vi.mock("../../src/components/MovieModal", () => ({
  default: () => <div>Movie Modal</div>,
}));

// Mock react-router-dom
const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    Link: ({ children }) => <div>{children}</div>,
  };
});

describe("FeedPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    navigateMock.mockClear();
  });

  // Successful fetch
  test("displays movies from backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockMovies = [{ _id: "12345", title: "Test Movie", genre: "Comedy", releaseYear:2000,description:"This is a test film", image:"" }];

    getMovies.mockResolvedValue({
      movies: mockMovies,
      token: "newToken",
    });
    getWatchList.mockResolvedValue({ movies: [] });

    render(<FeedPage />);

    expect(await screen.findByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText("This is a test film")).toBeInTheDocument();

    // token updated
    await waitFor(() => {
      expect(localStorage.getItem("token")).toEqual("newToken");
    });
  });
  // No token present

  test("navigates to login if no token is present", () => {
    render(<FeedPage />);
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  // API failure
  test("navigates to login if API call fails", async () => {
    window.localStorage.setItem("token", "testToken");

    getMovies.mockRejectedValue(new Error("API error"));

    render(<FeedPage />);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });

  test("displays user's watchlist movies", async () => {
  window.localStorage.setItem("token", "testToken");

  // Minimal movies list, so main movies don't interfere
  getMovies.mockResolvedValue({ movies: [], token: "mainToken" });

  // Watchlist movies
  const mockWatchlist = [
    {
      _id: "wl1",
      movie_id: {
        _id: "m1",
        title: "Watchlist Movie 1",
        releaseYear: 2010,
        description: "First watchlist movie",
      },
    },
    {
      _id: "wl2",
      movie_id: {
        _id: "m2",
        title: "Watchlist Movie 2",
        releaseYear: 2015,
        description: "Second watchlist movie",
      },
    },
  ];

  getWatchList.mockResolvedValue({ movies: mockWatchlist });

  render(<FeedPage />);

  // Check that both watchlist movies appear
  expect(await screen.findByText("Watchlist Movie 1")).toBeInTheDocument();
  expect(screen.getByText("2010")).toBeInTheDocument();
  expect(screen.getByText("First watchlist movie")).toBeInTheDocument();

  expect(await screen.findByText("Watchlist Movie 2")).toBeInTheDocument();
  expect(screen.getByText("2015")).toBeInTheDocument();
  expect(screen.getByText("Second watchlist movie")).toBeInTheDocument();
});



});

