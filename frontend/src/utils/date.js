export function formatDate(dateString) {
  const createdAt = new Date(dateString);
  const now = new Date();

  const diffMs = now - createdAt;
  const timeDiffMins = Math.floor(diffMs / (1000 * 60));
  const timeDiffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (timeDiffMins < 1) {
    return "Just now";
  } else if (timeDiffMins < 60) {
    return `${timeDiffMins} minute${timeDiffMins !== 1 ? "s" : ""} ago`;
  } else if (timeDiffHours < 24) {
    return `${timeDiffHours} hour${timeDiffHours !== 1 ? "s" : ""} ago`;
  } else {
    return createdAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
}