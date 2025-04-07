import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetGameByIdQuery } from '../api/rawgApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToGameLib, removeToGameLib } from '../redux/store/gamelib.slice';

function GameDetails() {
    const { id } = useParams();
    const { data: game, error, isLoading } = useGetGameByIdQuery(id);
    const dispatch = useDispatch();
    const libraryGames = useSelector((state) => state.gameCartLib || []);
    const isInLibrary = game ? libraryGames.includes(game.id) : false; 

    const handleLibraryToggle = () => {
        if (isInLibrary) {
            dispatch(removeToGameLib(game.id));
        } else {
            dispatch(addToGameLib(game.id));
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(game);
    return (
        <div className="container-fluid px-4">
            {/* Hero Section */}
            <div className="position-relative" style={{ height: "60vh", overflow: "hidden" }}>
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-100  object-cover"
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-4 bg-dark bg-opacity-75">
                    <h1 className="text-white display-4 mb-1">{game.name ? game.name : 'Not found'}</h1>
                    <div className="d-flex gap-3 text-white">
                        <span>Released: {new Date(game.released).toLocaleDateString()}</span>
                        <span>Rating: ⭐ {game.rating ? game.rating.toFixed(1) : "0"}</span>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">
                    {/* Main Content */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h3 className="mb-4">About</h3>
                                <div dangerouslySetInnerHTML={{ __html: game.description ? game.description : 'Not description' }} />

                                <div className="row g-3 mt-4">
                                    <div className="col-md-6">
                                        <h5>Genres</h5>
                                        <div className="d-flex flex-wrap gap-2">
                                            {game.genres && game.genres.map(genre => (
                                                <span key={genre.id} className="badge bg-primary">
                                                    {genre.name ? genre.name : 'Not found generes'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <h5>System Requirements</h5>
                                        {game.platforms && game.platforms.map(platform => (
                                            platform.requirements?.minimum && (
                                                <div key={platform.platform.id} className="bg-light p-3 rounded mb-2">
                                                    <h6>{platform.platform.name}</h6>
                                                    <pre className="mb-0 small text-muted">
                                                        {platform.requirements.minimum}
                                                    </pre>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Image */}
                        {game.background_image_additional && (
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h3 className="mb-4">Game Preview</h3>
                                    <img
                                        src={game.background_image_additional}
                                        className="img-fluid rounded"
                                        alt="Game preview"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="mb-4">Game Info</h5>
                                <dl className="row">
                                    <dt className="col-sm-5">Platforms</dt>
                                    <dd className="col-sm-7">
                                        {game.parent_platforms?.map(({ platform }) => (
                                            <span key={platform.id} className="badge bg-secondary me-1 mb-1">
                                                {platform.name ? platform.name : "Not found"}
                                            </span>
                                        ))}
                                    </dd>

                                    <dt className="col-sm-5">ESRB Rating</dt>
                                    <dd className="col-sm-7">
                                        <span className="badge bg-dark">{game.esrb_rating?.name || 'Not Rated'}</span>
                                    </dd>

                                    <dt className="col-sm-5">Metacritic</dt>
                                    <dd className="col-sm-7">
                                        <span className="badge bg-success">{game.metacritic ? game.metacritic : "Not found"}</span>
                                    </dd>

                                    <dt className="col-sm-5">Playtime</dt>
                                    <dd className="col-sm-7">{game.playtime ? game.playtime : "not found"} hours</dd>

                                    <dt className="col-sm-5">Developers</dt>
                                    <dd className="col-sm-7">
                                        {game.developers && game.developers.map(dev => (
                                            <div key={dev.id}>{dev.name}</div>
                                        ))}
                                    </dd>

                                    <dt className="col-sm-5">Publishers</dt>
                                    <dd className="col-sm-7">
                                        {game.publishers && game.publishers.map(publisher => (
                                            <div key={publisher.id}>{publisher.name}</div>
                                        ))}
                                    </dd>

                                    <dt className="col-sm-5">Available On</dt>
                                    <dd className="col-sm-7">
                                        {game.stores && game.stores.map(store => (
                                            <span key={store.store.id} className="badge bg-info me-1 mb-1">
                                                {store.store.name}
                                            </span>
                                        ))}
                                    </dd>
                                </dl>

                                <div className="d-grid gap-3 mt-4">
                                    <button
                                        className={`btn btn-lg ${isInLibrary ? 'btn-danger' : 'btn-primary'}`}
                                        onClick={handleLibraryToggle}
                                        title={isInLibrary ? 'Remove from Library' : 'Add to Library'}
                                    >
                                        {isInLibrary ? 'Remove from Library' : 'Add to Library'}
                                    </button>

                                    <a
                                        href={game.website}
                                        className="btn btn-outline-secondary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Official Website
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;