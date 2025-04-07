import React, { useState } from 'react';
import { useGetAllGamesQuery } from '../api/rawgApi';
import GameCart from '../component/GameCart';

const GameLayout = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    const {
        data: gamesData,
        isError,
        isLoading,
        isFetching
    } = useGetAllGamesQuery({
        page: currentPage,
        page_size: pageSize
    });

    const totalPages = Math.ceil((gamesData?.count || 0) / pageSize);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    const generatePageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        if (startPage > 1) pages.push(1);
        if (startPage > 2) pages.push('...');

        for (let i = startPage; i <= endPage; i++) pages.push(i);

        if (endPage < totalPages - 1) pages.push('...');
        if (endPage < totalPages) pages.push(totalPages);

        return pages;
    };

    return (
        <div className="container mt-4">
            {/* Game Grid */}
            {(isLoading || isFetching) ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : isError ? (
                <div className="alert alert-danger">Error loading games</div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 p-2">
                    {gamesData?.results?.map(game => (
                        <div key={game.id} className="col">
                            <GameCart games={game} />
                        </div>
                    ))}
                </div>
            )}

            {/* Top Pagination */}
            <div className="d-flex justify-content-center mb-4 gap-2">
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ← Previous
                </button>

                {generatePageNumbers().map((page, index) => (
                    page === '...' ? (
                        <button key={`ellipsis-${index}`} className="btn" disabled>...</button>
                    ) : (
                        <button
                            key={page}
                            className={`btn text-white ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default GameLayout;