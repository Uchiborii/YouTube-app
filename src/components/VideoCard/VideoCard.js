import React from 'react';
import "./VideoCard.css";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const VideoCard = ({ video }) => {
  return (
    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="card-link">
      <div className="video-card">
        <div className="card-img">
          <img src={video.snippet.thumbnails.high.url} alt="thumbnail" />
        </div>
        <h3 className="card-title">{video.snippet.title}</h3>
        <div className="card-info">
          <div className="card-data">
            <p className="title">{video.statistics.viewCount}回視聴</p>
          </div>
          <div className="card-horizontal">
            <div className="card-data like-comment">
              <ThumbUpOffAltIcon className="icon" />
              <span>{video.statistics.likeCount}</span>
            </div>
            <div className="card-data like-comment">
              <span>{video.statistics.commentCount}件のコメント</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;
