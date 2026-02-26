import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import '@testing-library/jest-dom'

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getMovies } from "../../src/services/movies";
import { useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/movies", () => {
  const getMoviesMock = vi.fn();
  return { getMovies: getMoviesMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays all movies from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockMovies = [{ _id: "12345", title: "Test Movie", genre: "Comedy", releaseYear:2000,description:"This is a test film", image:"" }];

    getMovies.mockResolvedValue({ movies: mockMovies, token: "newToken" });

    render(<FeedPage />);
    
    await screen.findByRole("article")

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText("This is a test film")).toBeInTheDocument();
  });

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
