
function Movies(props) {
  const { movie } = props;

  return (
    <article className="card h-100 d-flex flex-column" style={{width:"100%", backgroundColor:"transparent", border:"None"}}>
      {movie.image && (
        <img
          src={movie.image}
          alt={`${movie.title} poster`}
          className="card-img-top"
            style={{
              width: "100%",
              height: "224px",
              objectFit: "contain",
              backgroundColor: "black"
            }}
          onError={(e) => {
          e.target.onerror = null; // prevents infinite loop
          e.target.src = "https://img.icons8.com/color/1200/broken-image.jpg";
        }}
        />
      )}

      <div className="card-body d-flex flex-column align-items-start">
          <h5 className="card-title mb-0 text-truncate small">{movie.title}</h5>
          <span className="text-body-secondary"
          style={{backgroundColor:"transparent", fontSize:"0.75rem"}}>
            {movie.releaseYear} - {movie.genre.split(' ')[0]}
          </span>
          <span className="badge bg-secondary">
            {Number(movie.averageRating?.toFixed(1))}
          </span>
          </div>
    </article>
  );
}

export default Movies;