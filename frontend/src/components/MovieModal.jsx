// frontend/src/components/MovieModal.jsx
import { useState } from "react";
import { addWatchedMovie } from "../services/moviesWatched";

function MovieModal({ movie, onClose }) { 

      //managing these states here as don't think we'll need them elsewhere in the app
  const [review, setReview] = useState(""); //input starts blank
  const [rating, setRating] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await addWatchedMovie( movie._id, review, Number(rating), token);
      setSuccess(true);
      setTimeout(onClose, 1500); // close after short delay
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  function handleRatingChange(event) {
    const value = event.nativeEvent.data
    const ratings = ['1', '2', '3', '4', '5']

    if (ratings.includes(value)) {
      setRating(value)
    }
  }

  return (
<div
  style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)"}}>
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">

        <div className="card shadow-sm p-4 position-relative">
          
          <button type="button" className="btn btn-warning position-absolute top-0 end-0 m-2" onClick={onClose}>x</button>
          <h3 className="mb-4 text-center">{movie.title}</h3>
          <form onSubmit={handleSubmit}>
            
            <div className="input-group mb-3">
             <span className="input-group-text">Your Reveiw</span>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you think?"
                className="form-control"
                aria-label="Your Reveiw"
              />
            </div>

            <div className="input-group mb-3">
              <span class="input-group-text">Rating (1-5)</span>
              <input
                type="text"
                min="1"
                max="5"
                value={rating}
                onChange={handleRatingChange}
                className="form-control"
                aria-label="Rating (1-5)"
                />
            </div>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">Added to watched list!</p>}

            <button type="submit" className="btn btn-warning w-100">Submit Thoughts</button>
          </form>

        </div>

      </div>
    </div>
  </div>
</div>
);

}

export default MovieModal;

