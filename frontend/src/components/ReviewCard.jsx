import { formatDate } from "../utils/date";
import { StarRating } from "./starRating";


const defaultAvatar = "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg";

export function ReviewCard({ watchedEntry, heading, user }) {
    if (!watchedEntry) return "No reviews as yet.";
    return (
        <div className="rounded p-3 mt-3" style={{ backgroundColor: "#2e3843" }}>
            <h5>{heading}</h5>

            {user && (
                <div className="d-flex align-items-center mb-2">
                    <img
                        src={user.profile_image || defaultAvatar}
                        alt={user.username}
                        className="rounded-circle me-2"
                        style={{ width: 32, height: 32, objectFit: "cover" }}
                    />
                    <strong>{user.username}</strong>
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