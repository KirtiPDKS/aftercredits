
function Movies(props) {
  const { movie, img_height ="224px" } = props;

  return (
    <article className="card h-100 d-flex flex-column" style={{width:"100%", backgroundColor:"transparent", border:"None"}}>
      {movie.image && (
        <img
          src={movie.image}
          alt={`${movie.title} poster`}
          className="card-img-top"
          style={{width:"100%",height:img_height,objectFit:"cover",objectPosition:"top", borderRadius:"0"}}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            {/* star rating */}
          <span style={{ color: '#ffc107', fontSize: '1rem', textShadow: '0 0 6px rgba(255, 193, 7, 0.8), 0 0 16px rgba(255, 193, 7, 0.4)'}}>★</span>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>
            {Number(movie.averageRating?.toFixed(1))}
          </span>
          <span style={{ color: '#888', fontSize: '0.75rem' }}>/5</span>
        </div>
          {/* <span className="badge bg-secondary">
            {Number(movie.averageRating?.toFixed(1))}/5
          </span> */}
          </div>
    </article>
  );
}

export default Movies;