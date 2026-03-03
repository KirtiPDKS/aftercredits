function Movies(props) {
  const { movie } = props;

  return (
    <article className="card shadow-sm h-100 d-flex flex-column" style={{width:"100%"}}>
      {movie.image && (
        <img
          src={movie.image}
          alt={`${movie.title} poster`}
          className="card-img-top"
          style={{width:"100%",height:"224px",objectFit:"cover"}}
          onError={(e) => {
          e.target.onerror = null; // prevents infinite loop
          e.target.src = "https://img.icons8.com/color/1200/broken-image.jpg";
        }}
        />
      )}

      <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0 text-truncate small">{movie.title}</h5>
          <span className="badge bg-secondary">
            {movie.releaseYear}
          </span>
        </div>
    </article>
  );
}

export default Movies;