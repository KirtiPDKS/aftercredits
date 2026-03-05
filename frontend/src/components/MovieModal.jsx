// frontend/src/components/MovieModal.jsx
import { useState } from "react";
import { addWatchedMovie } from "../services/moviesWatched";
import { StarRating } from "./starRating";

function MovieModal({ movie, onClose, onSaved, existingReview, existingRating }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [review, setReview] = useState(existingReview ?? "");
  const [reviewRating, setReviewRating] = useState(existingRating ?? 0);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (review && !reviewRating) {
      setError("Please select a rating before writing a review.");
      return;
    }

    const trimmedReview = review.trim();
    const wordCount = trimmedReview.split(" ").filter(Boolean).length;

    if (trimmedReview && wordCount < 3) {
      setError("Review must be at least 3 words.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const savedEntry = await addWatchedMovie(
        movie._id,
        review,
        Number(reviewRating),
        token
      );

      setSuccess(true);

      setTimeout(() => {
        onSaved(savedEntry);  // Close after short delay
      }, 1000);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };


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

                    onChange={(e) => {
                      const value = e.target.value;
                      setReview(value);
                      // Clear the "3 words" error as soon as they type enough
                      if (error === "Review must be at least 3 words.") {
                        const trimmed = value.trim();
                        const wordCount = trimmed.split(" ").filter(Boolean).length;
                        if (wordCount >= 3) {
                          setError(null);
                        }
                      }
                    }}
                    placeholder="What did you think?"
                    className="form-control"
                    aria-label="Your Review"
                  />
                </div>

                <div className="mb-3">
                  Your Rating
                  <StarRating value={reviewRating} onChange={(val) => setReviewRating(val)} />
                  (<i>{reviewRating} out of 5</i>)
                </div>

                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">Review saved and added to watched list 🎞️ </p>}

                <button type="submit" className="btn btn-warning w-100">Save</button>
              </form>

            </div>

          </div>
        </div>
      </div>
    </div>

  );

}

export default MovieModal;

