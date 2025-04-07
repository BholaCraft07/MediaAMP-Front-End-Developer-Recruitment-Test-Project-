import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAllGamesQuery } from '../api/rawgApi';
import GameCart from '../component/GameCart';

const SearchList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const { data, isLoading, isError } = useGetAllGamesQuery({
    search: query,
    page_size: 20 
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Search Results for "{query}"</h3>

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="alert alert-danger">Error loading search results</div>
      ) : data?.results?.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {data.results.map(game => (
            <div key={game.id} className="col">
              <GameCart games={game} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No games found matching your search</div>
      )}
    </div>
  );
};

export default SearchList;