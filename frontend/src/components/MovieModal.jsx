// frontend/src/components/MovieModal.jsx
import { useState } from "react";
import { addWatchedMovie } from "../services/moviesWatched";
import { StarRating } from "./starRating";

function MovieModal({ movie, onClose, existingReview, existingRating }) { 
  const [review, setReview] = useState(existingReview);
  const [reviewRating, setReviewRating] = useState(existingRating);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ratingRequiredButMissing) 
      {
      return setError("Please enter a rating.")
      } else {setError(null)}
    try {
      const token = localStorage.getItem("token");
      await addWatchedMovie( movie._id, review, Number(reviewRating), token);
      setSuccess(true);
      setTimeout(onClose, 1600); // close after short delay
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const hasReview = review.trim().length > 0
  const RatingMissing = Number(reviewRating) === 0;
  const ratingRequiredButMissing = hasReview && RatingMissing;

  return (
<div
  className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">

        <div className="card shadow-sm p-4 position-relative">
          
          <button type="button" className="btn-close position-absolute top-0 end-0 m-2" onClick={onClose}></button>
          <h3 className="mb-4 text-center">{movie.title}</h3>
          <form onSubmit={handleSubmit}>
            
            <div className="input-group mb-3">

              <span
              className="input-group-text"
              style={{ alignItems: "flex-start", paddingTop: "0.5rem" }}
              > 
              Your Review 
              </span>

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you think?"
                className="form-control"
                aria-label="Your Review"
              />
            </div>

            <div className="mb-3">
              Your Rating
              <StarRating value={Number(reviewRating)} onChange={(val) => {setReviewRating(String(val)); setError(null);}} />
              (<i>{Number(reviewRating)} out of 5</i>)
            </div>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">Review saved and added to watched list 🎞️ </p>}

            <button type="submit" 
            className="btn btn-warning w-100"
            >Save</button>
          </form>

        </div>

      </div>
    </div>
  </div>
</div>

  );

}

export default MovieModal;

