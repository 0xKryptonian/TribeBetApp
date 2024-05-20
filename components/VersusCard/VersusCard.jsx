// components/VersusCard.js
import React, { useState } from 'react';
import BettingSlip from './BettingSlip/BettingSlip';
import gameData from '../../lib/gameData';

const VersusCard = ({ image1, image2, text1, text2, team1, team2, prob1, prob2, prob3, date, sportName, tournament }) => {
  const [bettingSlipVisible, setBettingSlipVisible] = useState(false);

  const handleOpenBettingSlip = () => {
    setBettingSlipVisible(true);
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-900 shadow-xl p-4 mb-4 text-center max-w-md h-[300px] mx-auto rounded-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-left">
          <h2 className="text-l font-bold text-white">{tournament}</h2>
        </div>
        <div className="text-right">
          <p className="text-gray-400">{date}</p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4">
        <div className="flex flex-col items-center mr-4">
          <img src={image1} alt="Team 1" className="w-24 h-auto rounded-xl mb-2" />
          <p className="text-lg font-bold text-white">{text1}</p>
        </div>
        <span className="text-2xl font-bold mx-4 text-white">vs</span>
        <div className="flex flex-col items-center ml-4">
          <img src={image2} alt="Team 2" className="w-24 h-auto rounded-xl mb-2" />
          <p className="text-lg font-bold text-white">{text2}</p>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <button
          onClick={handleOpenBettingSlip}
          className="result-button bg-black text-white border-solid text-start border-2 border-gray-300 w-13 items-center justify-center p-2 rounded-xl transition duration-300 ease-in-out transform hover:border-purple-400 hover:scale-105"
        >
          {team1} Wins
          <span className="text-purple-400"> {prob1}</span>
        </button>
        <button
          onClick={handleOpenBettingSlip}
          className="result-button bg-black text-white border-solid text-start border-2 border-gray-300 w-13 items-center justify-center p-2 rounded-xl transition duration-300 ease-in-out transform hover:border-purple-400 hover:scale-105"
        >
          Draw
          <span className="text-purple-400"> {prob2}</span>
        </button>
        <button
          onClick={handleOpenBettingSlip}
          className="result-button bg-black text-white border-solid text-start border-2 border-gray-300 w-13 items-center justify-center p-2 rounded-xl transition duration-300 ease-in-out transform hover:border-purple-400 hover:scale-105"
        >
          {team2} Wins
          <span className="text-purple-400"> {prob3}</span>
        </button>
      </div>
      {/* Betting Slip */}
      {bettingSlipVisible && (
        <BettingSlip
          onClose={() => setBettingSlipVisible(false)}
          match={{ team1, team2, prob1, prob2, prob3, date, sportName, image1, image2 }}
        />
      )}
    </div>
  );
};

export default VersusCard;
