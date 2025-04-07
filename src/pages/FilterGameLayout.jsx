import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllGamesQuery } from "../api/rawgApi";
import GameCart from "../component/GameCart";

const FilterGameLayout = () => {
  const [searchParams] = useSearchParams();
  
  // Convert URL params back to filter format
  const filters = {
    platforms: searchParams.get("platforms")?.split(",") || [],
    genres: searchParams.get("genres")?.split(",") || [],
    ordering: searchParams.get("ordering") || "",
    dates: searchParams.get("dates") || "",
    metacritic: searchParams.get("metacritic") || "",
  };

  const { data: games, isLoading, isError } = useGetAllGamesQuery(filters);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Filtered Games</h3>
      
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="alert alert-danger">Error loading games</div>
      ) : games?.results?.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {games.results.map(game => (
            <div key={game.id} className="col">
              <GameCart games={game} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No games found with these filters</div>
      )}
    </div>
  );
};

export default FilterGameLayout;