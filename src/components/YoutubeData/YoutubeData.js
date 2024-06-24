// YouTube APIの関数を定義
const getAllVideos = (apiKey, query, maxResults = 20) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&key=${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.items);
};

const getVideoDetails = (apiKey, videoId) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then(data => data.items[0]);
};

const YoutubeData = ({ query, setQuery, setLoading, setVideoData }) => {
  const apiKey = process.env.REACT_APP_YOUTUBE_API;


  const handleInputChange = (e) => {
    setQuery(e.target.value);
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
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleInputChange} placeholder="キーワード入力" />
        <button type="submit">検索</button>
      </form>
    </>
  )
}

export default YoutubeData