import React from 'react';
import { useGetGameByIdQuery } from '../api/rawgApi';
import GameCart from './GameCart';

const LibraryGameItem = ({ gameId }) => {
  const { data: game, isLoading, isError } = useGetGameByIdQuery(gameId);

  if (isLoading) return <div className="col">Loading...</div>;
  if (isError) return <div className="col">Error loading game</div>;
  if (!game) return null;

  return (
    <div className="col" 
    >
      <GameCart games={game} />
    </div>
  );
};

export default LibraryGameItem;