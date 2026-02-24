function Movies(props) {
  return <article key={props.movie._id}>
    {props.movie.image}
    <div> 
    {props.movie.title}
    {props.movie.release_year}
    </div>
    <div>
    {props.movie.description}
    </div>
    </article>;
}

export default Movies;
