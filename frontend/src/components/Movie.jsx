function Movies(props) {
  return <article key={props.movie._id}>
    {props.movie.image}
    <div> 
    <h3>{props.movie.title}</h3>
    <span>{props.movie.release_year}</span>
    </div>
    <div>
    <p>{props.movie.description}</p>
    </div>
    </article>;
}

export default Movies;
