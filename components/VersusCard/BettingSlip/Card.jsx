import React from 'react';

const Card = ({ team1, team2, image1, image2, odd, betAmount, onBetAmountChange, isSelected, onSelect }) => {
  return (
    <div className={`betting-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <h3>{team1} vs {team2}</h3>
      <img src={image1} alt={team1} />
      <p>Current Odd: {odd}</p>
      <input type="number" defaultValue={betAmount} onChange={onBetAmountChange} />
      <h4>Potential Win: {betAmount * odd}</h4>
    </div>
  );
};

export default Card;
