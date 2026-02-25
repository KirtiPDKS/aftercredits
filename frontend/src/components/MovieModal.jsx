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

  return (
  <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
    <div style={{ backgroundColor: "white", margin: "100px auto", padding: "20px", width: "400px" }}>
      
      <h3>{movie.title}</h3>

      <form onSubmit={handleSubmit}>
        
        <label>Your Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="What did you think?"
        />

        <label>Rating (1-5)</label>
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        {error && <p>{error}</p>}
        {success && <p>Added to watched list!</p>}

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>

      </form>
    </div>
  </div>
);

}

export default MovieModal;

