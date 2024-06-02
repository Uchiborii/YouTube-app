export const getAllVideos = (apiKey, query, maxResults = 10) => {
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
