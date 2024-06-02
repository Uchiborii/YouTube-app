import React from 'react';
import "./Analytics.css";

const Analytics = ({ video }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
      </div>
      <h3 className="cardName">{video.snippet.title}</h3>
      <div className="catdType">
        <div>チャンネル</div>
        <div>
          <span className="typeName">{video.snippet.channelTitle}</span>
        </div>
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">再生回数：{video.statistics.viewCount}</p>
        </div>
        <div className="cardData">
          <p className="title">公開日：{new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
        </div>
        <div className="cardData">
          <p className="title">説明：{video.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
