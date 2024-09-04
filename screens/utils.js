// utils.js
export const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.abs(now - past);
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    if (diffDays > 0) {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else {
      return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
    }
  };
  