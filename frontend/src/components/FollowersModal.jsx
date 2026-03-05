export default function FollowerModal({ followers }) {
  return (
    <div
      className="modal fade"
      id="FollowerModal"
      tabIndex="-1"
      aria-labelledby="FollowerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="FollowerModalLabel">
              Followers
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {followers && followers.length > 0 ? (
              <ul className="list-group">
                {followers.map((follower) => (
                  <li
                    key={follower.follower_id._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {follower.follower_id.username}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No followers yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}