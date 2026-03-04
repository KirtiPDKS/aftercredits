import { formatDate } from "../utils/date";
import { StarRating } from "./starRating";
import { Link } from "react-router-dom";
import "../App.css"

export function ReviewCard({ watchedEntry, heading, user, margin }) {
  const image = user.profile_image
    ? `${import.meta.env.VITE_BACKEND_URL}${user.profile_image}`
    : "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg";
    if (!watchedEntry) return "No reviews as yet.";
    const divClassName = "rounded p-3 mt-"+margin
    return (
        <div className={divClassName} style={{ backgroundColor: "#2e3843" }}>
            <h5>{heading}</h5>

            {user && (
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={image}
                        alt={user.username}
                        className="rounded-circle me-2"
                        style={{ width: 32, height: 32, objectFit: "cover" }}
                    />
                    <Link id="usernameLink" to={`/users/${user.username}`}>
                    <strong>{user.username}</strong>
                    </Link>
                </div>
            )}
            <div className="d-flex align-items-center gap-2 mb-1">
                <StarRating value={watchedEntry.rating} readOnly={true} />
                <span>({watchedEntry.rating} / 5)</span>
            </div>
            <p>{watchedEntry.review}</p>
            <small className="text-muted">
                Reviewed {formatDate(watchedEntry.createdAt)}
            </small>
        </div>
    )
}