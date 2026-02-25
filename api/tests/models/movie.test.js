require("../mongodb_helper");

const Movie = require("../../models/movies");

describe("Movies model", () => {
  beforeEach(async () => {
    await Movie.deleteMany({});
  })

  it("has a title, genre, release year, description,  director", async () => {
    const movie = new Movie({ title: "The Matrix", genre: "Sci-Fi", releaseYear: 1999, description: "A hacker discovers the truth about his reality.", director: "The Wachowskis" });
    await movie.save();
    expect(movie.title).toEqual("The Matrix");
    expect(movie.genre).toEqual("Sci-Fi");
    expect(movie.releaseYear).toEqual(1999);
    expect(movie.description).toEqual("A hacker discovers the truth about his reality.");
    expect(movie.director).toEqual("The Wachowskis");
  });

  it("can list all movies", async () => {
    const movies = await Movie.find()
    expect(movies.length).toEqual(0);
  });

  it("can save a movie", async () => {
    const movie = new Movie({ title: "The Matrix Reloaded" });

    await movie.save();
    const movies = await Movie.find();
    expect(movies[0].title).toEqual("The Matrix Reloaded");
  });
});
