import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { addToGameLib, removeToGameLib } from '../redux/store/gamelib.slice';
import { ClerkContext } from '../contexts/ClarkContext';
import { toast } from 'react-toastify';

function GameCart({ games }) {
  // Safety check for undefined games prop
  if (!games) return null;

  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const dispatch = useDispatch();
  const libraryGames = useSelector((state) => state.gameCartLib || []);
  const isInLibrary = libraryGames.includes(games.id);

  // Optional chaining for all game properties
  const platforms = games?.platforms || [];
  const visiblePlatforms = showAllPlatforms ? platforms : platforms.slice(0, 3);


  const { authToken } = useContext(ClerkContext)

  const handleLibraryToggle = () => {

    if (authToken) {
      if (isInLibrary) {
        dispatch(removeToGameLib(games.id));
      } else {
        dispatch(addToGameLib(games.id));
      }

    } else {
      toast.error('Please Sign Up')
    }

  };

  return (
    <div className="card shadow-sm h-100" style={{ minHeight: '250px' }}>
      <div className="ratio ratio-16x9 card-img">
        <Link to={`/${games?.id}`}>
          <img
            src={games?.background_image}
            className="card-img-top "
            alt={games?.name || 'Game image'}
            loading="lazy"
          />
        </Link>
      </div>

      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex flex-wrap gap-1 mb-2">
          {visiblePlatforms.map((item) => (
            <span
              key={item.platform?.id}
              className="badge bg-dark text-white fs-7 py-1 px-2"
            >
              {item.platform?.name}
            </span>
          ))}

          {platforms.length > 3 && (
            <button
              className="badge bg-secondary fs-7 py-1 px-2 border-0"
              onClick={() => setShowAllPlatforms(!showAllPlatforms)}
              style={{ cursor: 'pointer' }}
            >
              {showAllPlatforms
                ? 'Show less'
                : `+${platforms.length - 3} more`}
            </button>
          )}
        </div>

        <h6 className="card-title mb-2 fs-5 lh-sm text-truncate-2">
          {games?.name || 'Untitled Game'}
        </h6>

        <div className="mt-auto d-flex justify-content-start flex-column">
          <small className="text-muted flex-shrink-0 d-flex align-items-center gap-1 fs-5">
            <ReactStars
              color2={'#ffd700'}
              count={5}
              value={games?.rating ?? 0}
              size={18}
              edit={false}
              isHalf={true}
              activeColor="#ffd700"
            />
            ({games?.rating?.toFixed(1) ?? 'N/A'})
          </small>

          <div className="d-flex align-items-center gap-2 mt-2">
            <button
              className={`badge ${isInLibrary ? 'bg-danger' : 'bg-success'} fs-6`}
              style={{ cursor: 'pointer', outline: 'none', border: 'none' }}
              onClick={handleLibraryToggle}
              title={isInLibrary ? 'Remove from Library' : 'Add to Library'}
            >
              {isInLibrary ? '-' : '+'}
            </button>

            <span className="text-muted fs-7">
              {(games?.added?.toLocaleString() ?? 0) + ' added'}
            </span>
          </div>

          {games?.esrb_rating?.name && (
            <div className="mt-2">
              <span className="badge bg-dark">
                ESRB: {games.esrb_rating.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCart;