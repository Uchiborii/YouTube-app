import React, { useState, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useTable, useSortBy, useFilters } from 'react-table';

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

function App() {
  const apiKey = process.env.REACT_APP_YOUTUBE_API;
  console.log("APIキー：" + apiKey)
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);

  //入力された値を取得
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

  const columns = useMemo(
    () => [
      {
        Header: 'サムネイル',
        accessor: 'snippet.thumbnails.default.url',
        Cell: ({ cell: { value } }) => <img src={value} alt="thumbnail" />
      },
      {
        Header: 'タイトル',
        accessor: 'snippet.title'
      },
      {
        Header: '再生数',
        accessor: 'statistics.viewCount'
      },
      {
        Header: 'いいね数',
        accessor: 'statistics.likeCount'
      },
      {
        Header: 'コメント数',
        accessor: 'statistics.commentCount'
      }
    ],
    []
  );

  const data = useMemo(() => videoData, [videoData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <>
      <Navbar />
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={handleInputChange} placeholder="入力" />
          <button type="submit">検索</button>
        </form>
        {loading ? (
          <h1 className="loading">ロード中・・・</h1>
        ) : (
          <>
            <div className="channel-name">
              <span>【チャンネル名】</span>
              <span className="channelName">{videoData.length > 0 ? videoData[0].snippet.channelTitle : ''}</span>
            </div>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                        <div className="column-header">
                          {column.id === 'snippet.title' || column.id === 'snippet.thumbnails.default.url'
                            ? column.render('Header')
                            : (
                              <>
                                {column.render('Header')}
                                <span onClick={() => column.toggleSortBy(!column.isSortedDesc, true)}>
                                  {column.isSortedDesc ? ' ↓' : ' ↑'}
                                </span>
                              </>
                            )
                          }
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default App;
