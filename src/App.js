import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Analytics from './components/Analytics/Analytics.js'; // ここを追加

// getAllVideos と getVideoDetails の定義を移動
export const getAllVideos = (apiKey, query, maxResults = 20) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&key=${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.items);
};

export const getVideoDetails = (apiKey, videoId) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.items[0]);
};

function App() {
  const apiKey = "AIzaSyCDW5UfEtz5ZDobKBxx9Qji12_Q-O8gu2Y"; // あなたのAPIキーを設定してください
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value); // ユーザーの入力を状態に設定
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getAllVideos(apiKey, query);
      await loadVideoData(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching video data:", error);
      setLoading(false);
    }
  };

  const loadVideoData = async (data) => {
    let _videoData = await Promise.all(
      data.map(async (video) => {
        let videoDetails = await getVideoDetails(apiKey, video.id.videoId);
        return videoDetails;
      })
    );
    setVideoData(_videoData);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={handleInputChange} placeholder="クエリを入力してください" />
          <button type="submit">検索</button>
        </form>
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <div className="videoCardContainer">
            {videoData.map((video, i) => (
              <Analytics key={i} video={video} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
