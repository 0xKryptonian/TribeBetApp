// pages/stream.jsx
import React, { useState } from 'react';
import Video from 'next-video';

const StreamPage = () => {
  // Mock match data
  const match = {
    team1: { name: 'Team Alpha', image: '/team-alpha.png', prob1: 1.5 },
    team2: { name: 'Team Omega', image: '/team-omega.png', prob2: 2.0 },
    prob3: 3.0 // Odds for a draw
  };

  const [selectedOption, setSelectedOption] = useState('Team A');
  const [betAmount, setBetAmount] = useState('');

  const odds = selectedOption === 'Team A' ? match.team1.prob1 : selectedOption === 'Team B' ? match.team2.prob2 : match.prob3;

  const calculatePotentialWin = () => {
    return (parseFloat(betAmount) * parseFloat(odds)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-black text-white flex flex-col md:flex-row">
      {/* Video Section */}
      <div className="w-full md:w-2/3 p-4">
        <div className="bg-gray-900 border-gray-400 mb-2 rounded-lg overflow-hidden shadow-xl">
          {/* <div className="h-96 flex items-center  justify-center bg-cover bg-center" style={{ backgroundImage: "url('/esports-background.jpg')" }}>
            <span className="text-2xl font-bold text-white">Live Stream Video Here</span>
          </div> */}
          <div>
            <Video src='/video.mp4' 
            autoplay
            loop
            />
          </div>

        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">Epic Battle: Team Alpha vs Team Omega</h2>
          <p>Experience the exhilaration of esports like never before! Immerse yourself in the world of competitive gaming, where top-tier talent from around the globe battles it out for supremacy. Witness heart-pounding action, precision teamwork, and jaw-dropping plays that will leave you on the edge of your seat. Whether you're a seasoned esports enthusiast or a newcomer, our event promises an unforgettable spectacle that showcases the true essence of digital athleticism.</p>

          <p>Don't miss this opportunity to be part of the esports phenomenon and cheer for your favorite teams as they vie for victory! Plus, if you've placed bets, get ready for the added excitement of potentially winning big while enjoying the action.</p>

        </div>
      </div>

      {/* Betting Slip Section */}
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-700 text-white rounded-lg p-4 shadow-lg sticky top-0">
          <h2 className="text-xl font-bold mb-2">Bet Slip</h2>
          <h3 className="text-lg mb-2">{match.team1.name} VS {match.team2.name}</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Option</label>
            <select
              className="w-full px-2 py-1 border border-gray-400 rounded mb-2 bg-gray-800 text-white"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="Team A">{`${match.team1.name} - ${match.team1.prob1}`}</option>
              <option value="Team B">{`${match.team2.name} - ${match.team2.prob2}`}</option>
              <option value="Draw">{`Draw - ${match.prob3}`}</option>
            </select>

            <input
              type="number"
              placeholder="Enter bet amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full px-2 py-1 border border-gray-400 rounded bg-gray-800 text-white"
            />
            <p className="text-sm mt-2">Potential Win: {calculatePotentialWin()}</p>
          </div>

          <button
            onClick={() => console.log(`Bet placed on ${selectedOption} with amount ${betAmount}`)}
            className="bg-custom-color hover:bg-green-700 text-black px-4 py-2 rounded-full focus:outline-none w-full"
          >
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
