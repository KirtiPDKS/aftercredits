function Movies(props) {
  const { movie } = props;

  return (
    <article className="card h-100 shadow-sm">
      {movie.image && (
        <img
          src={movie.image}
          alt={`${movie.title} poster`}
          className="card-img-top img-fluid"
        />
      )}

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-around align-items-start mb-2">
          <h5 className="card-title mb-0">{movie.title}</h5>
          <span className="badge bg-secondary">
            {movie.releaseYear}
          </span>
        </div>

        <p className="card-text flex-grow-1">
          {movie.description}
        </p>
      </div>
    </article>
  );
}

export default Movies;