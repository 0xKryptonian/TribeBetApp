"use client"
// components/SportSlider.js
import { useState } from 'react';

const SportSlider = ({ sports, onSportChange }) => {
  const [selectedSport, setSelectedSport] = useState(null);

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
    onSportChange(sport);
  };

  return (
    <div className="flex flex-row overflow-x-auto p-2 mb-4">
      {sports.map((sport) => (
        <button
          key={sport}
          className={`${
            selectedSport === sport
              ? 'bg-[#98ee2c] text-white'
              : 'bg-gray-300 text-gray-700'
          } px-4 py-2 rounded-full focus:outline-none mr-2`}
          onClick={() => handleSportClick(sport)}
        >
          {sport}
        </button>
      ))}
    </div>
  );
};

export default SportSlider;
