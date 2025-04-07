import React from 'react';
import { useSelector } from 'react-redux';
import GameCart from '../component/GameCart';
import LibraryGameItem from '../component/LibraryGameItem';

function LibraryPage() {
  const libraryGameIds = useSelector((state) => state.gameCartLib);

  return (
    <div className="container library-container">
      <h1 className="my-4">My Game Library</h1>

      {libraryGameIds.length === 0 && (
        <div className="alert alert-info">
          Your library is empty. Start adding games!
        </div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {libraryGameIds.map((id) => (
          <LibraryGameItem key={id} gameId={id} />
        ))}
      </div>
    </div>
  );
}

export default LibraryPage;