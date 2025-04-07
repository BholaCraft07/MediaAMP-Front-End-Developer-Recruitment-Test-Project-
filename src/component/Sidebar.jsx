// import React, { useState } from "react";
// import FilterGameLayout from "../pages/FilterGameLayout.jsx";
// import { useNavigate } from "react-router-dom";

// const Sidebar = ({ isOpen }) => {
//   const [filters, setFilters] = useState({
//     platforms: [],
//     genres: [],
//     ordering: "",
//     dates: "",
//     metacritic: "",
//   });

//   const navigate = useNavigate();

//   const handleFilterChange = (filterType, value) => {
//     const newFilters = { ...filters, [filterType]: value };
//     setFilters(newFilters);
//   };

//   const resetFilters = () => {
//     const resetState = {
//       platforms: [],
//       genres: [],
//       ordering: "",
//       dates: "",
//       metacritic: "",
//     };
//     setFilters(resetState);
//   };

//   const handleApplyFilters = () => {
//     // Convert filters to URL-friendly format
//     const queryParams = new URLSearchParams({
//       platforms: filters.platforms.join(","),
//       genres: filters.genres.join(","),
//       ordering: filters.ordering,
//       dates: filters.dates,
//       metacritic: filters.metacritic,
//     }).toString();

//     navigate(`/filter?${queryParams}`);
//   };
//   // const handleApplyFilters = () => {
//   //   setShowFilteredGames(true);
//   // };

//   return (
//     <>
//       <div
//         className={`sidebar position-sticky z-1 d-flex flex-column flex-shrink-0 text-white ${isOpen ? "p-2 py-5" : "p-0"
//           }`}
//         style={{
//           width: isOpen ? "200px" : "0",
//           background: "rgba(0, 0, 0, 0.7)",
//           height: "90vh",
//           transition: "width 0.3s ease-in-out",
//         }}
//       >
//         {isOpen && (
//           <>
//             <h4 className="text-center mb-4">Filter Games</h4>

//             {/* Filters UI */}
//             <div className="mb-4">
//               <div className="filter-group mb-3">
//                 <label className="form-label text-white">Platforms</label>
//                 <select
//                   multiple
//                   className="form-select bg-dark text-white border-secondary"
//                   value={filters.platforms}
//                   onChange={(e) =>
//                     handleFilterChange(
//                       "platforms",
//                       Array.from(e.target.selectedOptions, (opt) => opt.value)
//                     )
//                   }
//                 >
//                   <option value="pc">PC</option>
//                   <option value="playstation">PlayStation</option>
//                   <option value="xbox">Xbox</option>
//                   <option value="nintendo">Nintendo</option>
//                 </select>
//               </div>

//               <div className="filter-group mb-3">
//                 <label className="form-label text-white">Genres</label>
//                 <select
//                   multiple
//                   className="form-select bg-dark text-white border-secondary"
//                   value={filters.genres}
//                   onChange={(e) =>
//                     handleFilterChange(
//                       "genres",
//                       Array.from(e.target.selectedOptions, (opt) => opt.value)
//                     )
//                   }
//                 >
//                   <option value="action">Action</option>
//                   <option value="adventure">Adventure</option>
//                   <option value="role-playing">Role-Playing</option>
//                   <option value="sports">Sports</option>
//                 </select>
//               </div>

//               <div className="filter-group mb-3">
//                 <label className="form-label text-white">Sort By</label>
//                 <select
//                   className="form-select bg-dark text-white border-secondary"
//                   value={filters.ordering}
//                   onChange={(e) => handleFilterChange("ordering", e.target.value)}
//                 >
//                   <option value="">Default</option>
//                   <option value="-released">Newest</option>
//                   <option value="released">Oldest</option>
//                   <option value="-metacritic">Best Rating</option>
//                   <option value="-rating">User Rating</option>
//                 </select>
//               </div>

//               <div className="filter-group mb-3">
//                 <label className="form-label text-white">Release Year</label>
//                 <select
//                   className="form-select bg-dark text-white border-secondary"
//                   value={filters.dates}
//                   onChange={(e) => handleFilterChange("dates", e.target.value)}
//                 >
//                   <option value="">All Years</option>
//                   {Array.from({ length: 25 }, (_, i) => {
//                     const year = new Date().getFullYear() - i;
//                     return (
//                       <option key={year} value={`${year}-01-01,${year}-12-31`}>
//                         {year}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>

//               <div className="filter-group mb-4">
//                 <label className="form-label text-white">Min Score</label>
//                 <select
//                   className="form-select bg-dark text-white border-secondary"
//                   value={filters.metacritic}
//                   onChange={(e) =>
//                     handleFilterChange("metacritic", e.target.value)
//                   }
//                 >
//                   <option value="">All Scores</option>
//                   <option value="80,100">80+</option>
//                   <option value="60,79">60-79</option>
//                   <option value="40,59">40-59</option>
//                   <option value="0,39">Below 40</option>
//                 </select>
//               </div>

//               <button
//                 className="btn btn-primary w-100 mb-2"
//                 onClick={handleApplyFilters}
//               >
//                 Apply Filters
//               </button>
//               <button className="btn btn-danger w-100" onClick={resetFilters}>
//                 Clear Filters
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const [filters, setFilters] = useState({
    platforms: [],
    genres: [],
    ordering: "",
    dates: "",
    metacritic: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const resetFilters = () => {
    setFilters({
      platforms: [],
      genres: [],
      ordering: "",
      dates: "",
      metacritic: "",
    });
  };

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams({
      platforms: filters.platforms.join(","),
      genres: filters.genres.join(","),
      ordering: filters.ordering,
      dates: filters.dates,
      metacritic: filters.metacritic,
    }).toString();

    navigate(`/filter?${queryParams}`);
  };

  return (
    <div
      className={`position-sticky d-flex flex-column text-white bg-dark shadow ${
        isOpen ? "px-3 py-4" : "px-0"
      }`}
      style={{
        width: isOpen ? "220px" : "0",
        height: "90vh",
        overflowY: "auto",
        transition: "width 0.3s ease-in-out",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
      }}
    >
      {isOpen && (
        <>
          <h5 className="text-center mb-4">Filter Games</h5>

          {/* Platforms */}
          <div className="mb-3">
            <label className="form-label">Platforms</label>
            <select
              multiple
              className="form-select bg-dark text-white border-secondary"
              value={filters.platforms}
              onChange={(e) =>
                handleFilterChange(
                  "platforms",
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              <option value="pc">PC</option>
              <option value="playstation">PlayStation</option>
              <option value="xbox">Xbox</option>
              <option value="nintendo">Nintendo</option>
            </select>
          </div>

          {/* Genres */}
          <div className="mb-3">
            <label className="form-label">Genres</label>
            <select
              multiple
              className="form-select bg-dark text-white border-secondary"
              value={filters.genres}
              onChange={(e) =>
                handleFilterChange(
                  "genres",
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="role-playing">Role-Playing</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="mb-3">
            <label className="form-label">Sort By</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={filters.ordering}
              onChange={(e) => handleFilterChange("ordering", e.target.value)}
            >
              <option value="">Default</option>
              <option value="-released">Newest</option>
              <option value="released">Oldest</option>
              <option value="-metacritic">Best Rating</option>
              <option value="-rating">User Rating</option>
            </select>
          </div>

          {/* Release Year */}
          <div className="mb-3">
            <label className="form-label">Release Year</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={filters.dates}
              onChange={(e) => handleFilterChange("dates", e.target.value)}
            >
              <option value="">All Years</option>
              {Array.from({ length: 25 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={`${year}-01-01,${year}-12-31`}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Metacritic Score */}
          <div className="mb-4">
            <label className="form-label">Min Score</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={filters.metacritic}
              onChange={(e) => handleFilterChange("metacritic", e.target.value)}
            >
              <option value="">All Scores</option>
              <option value="80,100">80+</option>
              <option value="60,79">60-79</option>
              <option value="40,59">40-59</option>
              <option value="0,39">Below 40</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100 mb-2"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button className="btn btn-outline-light w-100" onClick={resetFilters}>
            Clear Filters
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
