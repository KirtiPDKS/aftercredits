import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import "@testing-library/jest-dom";

import { BrowsingPage } from "../../src/pages/Browsing/BrowsingPage";
import { LoginPage } from "../../src/pages/Login/LoginPage"
import { getMovies } from "../../src/services/movies";

vi.mock("../../src/services/movies", () => ({
  getMovies: vi.fn(),
}));

async function useSearchBarTitle() {
  const user = userEvent.setup();

  const userInput = screen.getByPlaceholderText("Search by Title or Director");

  await user.type(userInput, "Whiplash");
}

async function useSearchBarTitlePart() {
  const user = userEvent.setup();

  const userInput = screen.getByPlaceholderText("Search by Title or Director");

  await user.type(userInput, "Whip");
}

async function useSearchBarDirector() {
  const user = userEvent.setup();

  const userInput = screen.getByPlaceholderText("Search by Title or Director");

  await user.type(userInput, "Chazelle");
}

async function useSearchBarDirectorPart() {
  const user = userEvent.setup();

  const userInput = screen.getByPlaceholderText("Search by Title or Director");

  await user.type(userInput, "Chaze");
}

async function useFilterGenre() {
  const user = userEvent.setup();

  const userInput = screen.getByDisplayValue("Genre");

  await user.selectOptions(userInput, "Drama");
}

async function useFilterYear() {
  const user = userEvent.setup();

  const userInput = screen.getByDisplayValue("Year");

  await user.selectOptions(userInput, "2010 - 2019");
}

describe("Browsing Page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  test("It displays all movies from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    getMovies.mockResolvedValue({
      movies: [
        {
          _id: "12345",
          title: "Test Movie",
          genre: "Fantasy",
          releaseYear: 2000,
          description: "This is a test film",
          image: "",
          director: "Test Guy",
        },
      ],
      token: "newToken",
    });

    render(
      <MemoryRouter>
        <BrowsingPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("Test Movie"))
      .toBeInTheDocument();
  });
  
  test("It displays the correct movie corrisponding with whats been searched, by title", async () => {
    window.localStorage.setItem("token", "testToken");

    getMovies.mockResolvedValue({
      movies: [
        {
          _id: "12345",
          title: "Test Movie",
          genre: "Fantasy",
          releaseYear: 2000,
          description: "This is a test film",
          image: "",
          director: "Test Guy",
        },
        {
          _id: "123456",
          title: "Whiplash",
          genre: "Drama",
          releaseYear: 2014,
          description: "This is a test film",
          image: "",
          director: "Damien Chazelle",
        },
      ],
      token: "newToken",
    });

    render(
      <MemoryRouter>
        <BrowsingPage />
      </MemoryRouter>
    );

    await useSearchBarTitle();

    expect(await screen.findByText("Whiplash"))
      .toBeInTheDocument();
  });

test("It displays the correct movie corrisponding with whats been searched, by part of title", async () => {
    window.localStorage.setItem("token", "testToken");

    getMovies.mockResolvedValue({
      movies: [
        {
          _id: "12345",
          title: "Test Movie",
          genre: "Fantasy",
          releaseYear: 2000,
          description: "This is a test film",
          image: "",
          director: "Test Guy",
        },
        {
          _id: "123456",
          title: "Whiplash",
          genre: "Drama",
          releaseYear: 2014,
          description: "This is a test film",
          image: "",
          director: "Damien Chazelle",
        },
      ],
      token: "newToken",
    });

    render(
      <MemoryRouter>
        <BrowsingPage />
      </MemoryRouter>
    );

    await useSearchBarTitlePart();

    expect(await screen.findByText("Whiplash"))
      .toBeInTheDocument();
  });

  test("It displays the correct movie corrisponding with whats been searched, by director", async () => {
    window.localStorage.setItem("token", "testToken");

    getMovies.mockResolvedValue({
      movies: [
        {
          _id: "12345",
          title: "Test Movie",
          genre: "Fantasy",
          releaseYear: 2000,
          description: "This is a test film",
          image: "",
          director: "Test Guy",
        },
        {
          _id: "123456",
          title: "Whiplash",
          genre: "Drama",
          releaseYear: 2014,
          description: "This is a test film",
          image: "",
          director: "Damien Chazelle",
        },
      ],
      token: "newToken",
    });

    render(
      <MemoryRouter>
        <BrowsingPage />
      </MemoryRouter>
    );

    await useSearchBarDirector();

    expect(await screen.findByText("Whiplash"))
      .toBeInTheDocument();
  });

  test("It displays the correct movie corrisponding with whats been searched, by part of director", async () => {
    window.localStorage.setItem("token", "testToken");

    getMovies.mockResolvedValue({
      movies: [
        {
          _id: "12345",
          title: "Test Movie",
          genre: "Fantasy",
          releaseYear: 2000,
          description: "This is a test film",
          image: "",
          director: "Test Guy",
        },
        {
          _id: "123456",
          title: "Whiplash",
          genre: "Drama",
          releaseYear: 2014,
          description: "This is a test film",
          image: "",
          director: "Damien Chazelle",
        },
      ],
      token: "newToken",
    });

    render(
      <MemoryRouter>
        <BrowsingPage />
      </MemoryRouter>
    );

    await useSearchBarDirectorPart();

    expect(await screen.findByText("Whiplash"))
      .toBeInTheDocument();
  });

  test("It displays the correct movie corrisponding with what genre has been selected", async () => {
  window.localStorage.setItem("token", "testToken");

  getMovies.mockResolvedValue({
    movies: [
      {
        _id: "12345",
        title: "Test Movie",
        genre: "Fantasy",
        releaseYear: 2000,
        description: "This is a test film",
        image: "",
        director: "Test Guy",
      },
      {
        _id: "123456",
        title: "Whiplash",
        genre: "Drama",
        releaseYear: 2014,
        description: "This is a test film",
        image: "",
        director: "Damien Chazelle",
      },
    ],
    token: "newToken",
  });

  render(
    <MemoryRouter>
      <BrowsingPage />
    </MemoryRouter>
  );

  await useFilterGenre();

  expect(await screen.findByText("Whiplash"))
    .toBeInTheDocument();
});

test("It displays the correct movie corrisponding with what year filter has been selected", async () => {
  window.localStorage.setItem("token", "testToken");

  getMovies.mockResolvedValue({
    movies: [
      {
        _id: "12345",
        title: "Test Movie",
        genre: "Fantasy",
        releaseYear: 2000,
        description: "This is a test film",
        image: "",
        director: "Test Guy",
      },
      {
        _id: "123456",
        title: "Whiplash",
        genre: "Drama",
        releaseYear: 2014,
        description: "This is a test film",
        image: "",
        director: "Damien Chazelle",
      },
    ],
    token: "newToken",
  });

  render(
    <MemoryRouter>
      <BrowsingPage />
    </MemoryRouter>
  );

  await useFilterYear();

  expect(await screen.findByText("Whiplash"))
    .toBeInTheDocument();
});

test("It displays the correct movie when all filters and search is used together", async () => {
  window.localStorage.setItem("token", "testToken");

  getMovies.mockResolvedValue({
    movies: [
      {
        _id: "12345",
        title: "Test Movie",
        genre: "Fantasy",
        releaseYear: 2000,
        description: "This is a test film",
        image: "",
        director: "Test Guy",
      },
      {
        _id: "123456",
        title: "Whiplash",
        genre: "Drama",
        releaseYear: 2014,
        description: "This is a test film",
        image: "",
        director: "Damien Chazelle",
      },
    ],
    token: "newToken",
  });

  render(
    <MemoryRouter>
      <BrowsingPage />
    </MemoryRouter>
  );

  await useSearchBarTitle();
  await useFilterGenre();
  await useFilterYear();

  expect(await screen.findByText("Whiplash"))
    .toBeInTheDocument();
});

});