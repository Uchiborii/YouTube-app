import React from 'react';

function VideoCard({ video }) {
  return (
    <div className="videoCard">
      <h3>{video.snippet.title}</h3>
      <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
      <p>{video.snippet.description}</p>
      <p>Views: {video.statistics.viewCount}</p>
    </div>
  );
}

export default VideoCard;
