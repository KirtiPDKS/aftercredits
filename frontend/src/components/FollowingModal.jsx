export default function FollowingModal({ following }) {
  return (
    <div
      className="modal fade"
      id="FollowingModal"
      tabIndex="-1"
      aria-labelledby="FollowingModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="FollowingModalLabel">
              Following
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {following && following.length > 0 ? (
              <ul className="list-group">
                {following.map((user) => (
                  <li key={user.following_id._id} className="list-group-item">
                    {user.following_id.username}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Not following anyone yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}