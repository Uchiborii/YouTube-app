import React, { useState, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import YoutubeData from './components/YoutubeData/YoutubeData';
import Sort from './components/Sort/Sort';
import DisplayData from './components/DisplayData/DisplayData';
import { useTable, useSortBy, useFilters } from 'react-table';


function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);


  const columns = useMemo(
    () => [
      {
        Header: 'サムネイル',
        accessor: 'snippet.thumbnails.default.url',
        Cell: ({ cell: { value } }) => <img src={value} alt="thumbnail" />
      },
      {
        Header: 'タイトル',
        accessor: 'snippet.title',
        Cell: ({ row, cell: { value } }) => (
          <a href={`https://www.youtube.com/watch?v=${row.original.id}`} target="_blank" rel="noopener noreferrer" className="custom-title">
            {value}
          </a>
        )
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
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <>
      <Navbar />
      <div className="App">
        <YoutubeData
          query={query}
          setQuery={setQuery}
          setLoading={setLoading}
          setVideoData={setVideoData}
        />

        {loading ? (
          <h1 className="loading">ロード中・・・</h1>
        ) : (
          <>
            <Sort headerGroups={headerGroups} />
            <DisplayData
              getTableBodyProps={getTableBodyProps}
              rows={rows}
              prepareRow={prepareRow}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;				