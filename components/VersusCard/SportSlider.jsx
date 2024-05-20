// components/SportSlider.js
import React, { useState, useRef, useEffect } from 'react';

const SportSlider = ({ sports, onSportChange }) => {
  const [clickedSport, setClickedSport] = useState('All');
  const sliderRef = useRef(null);

  const handleSportClick = (sport) => {
    setClickedSport(sport);
    onSportChange(sport);
  };

  useEffect(() => {
    const sliderContainer = sliderRef.current;

    const handleScroll = () => {
      const scrollLeft = sliderContainer.scrollLeft;
      const scrollWidth = sliderContainer.scrollWidth;
      const clientWidth = sliderContainer.clientWidth;

      // Hide the first button if scrolled
      const hideFirstButton = scrollLeft > 0;
      // Hide the last button if scrolled to the end
      const hideLastButton = scrollLeft + clientWidth < scrollWidth;

      document.querySelectorAll('.sport-button').forEach((button, index) => {
        if (index === 0 && hideFirstButton) {
          button.classList.add('hidden');
        } else if (index === sports.length - 1 && hideLastButton) {
          button.classList.add('hidden');
        } else {
          button.classList.remove('hidden');
        }
      });
    };

    sliderContainer.addEventListener('scroll', handleScroll);

    return () => {
      sliderContainer.removeEventListener('scroll', handleScroll);
    };
  }, [sports]);

  useEffect(() => {
    // Set initial glow for the "All" button
    const allButton = document.querySelector('.sport-button');
    if (allButton) {
      allButton.classList.add('glow');
    }
  }, []);

  return (
    <div ref={sliderRef} className="flex overflow-x-auto mb-4 relative">
      {sports.map((sport, index) => (
        <button
          key={sport}
          className={`${
            clickedSport === sport
              ? 'bg-[#98ee2c] text-white glow'  // Apply glow effect when clicked
              : 'bg-white text-black'
          } px-4 py-2 rounded-full focus:outline-none mr-2 mb-3 sport-button`}
          onClick={() => handleSportClick(sport)}
        >
          {sport}
        </button>
      ))}
    </div>
  );
};

export default SportSlider;
