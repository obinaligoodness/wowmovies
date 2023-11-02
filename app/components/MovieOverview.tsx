// MovieOverview.tsx

import React from 'react';

interface MovieOverviewProps {
  overview: string;
  onClose: () => void;
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ overview, onClose }) => {
    return (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <p>{overview}</p>
          </div>
        </div>
      );
    
};

export default MovieOverview;
