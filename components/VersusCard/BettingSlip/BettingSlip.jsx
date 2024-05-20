"use client"
// components/BettingSlip.js
import React, { useState } from 'react';
import { gameData } from '../../../lib/gameData';
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const BettingSlip = ({ onClose, match }) => {
  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signAndSubmitBCSTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();
  const [selectedOption, setSelectedOption] = useState('Team A');
  const [betAmount, setBetAmount] = useState(0);

  const odds = selectedOption === 'Team A' ? match.prob1 : selectedOption === 'Team B' ? match.prob2 : match.prob3;

  const calculatePotentialWin = () => {
    return (parseFloat(betAmount) * parseFloat(odds)).toFixed(2);
  };

  const handlePlaceBet = () => {
    // Implement your logic to place the bet
    onSignAndSubmitTransaction();
    console.log(`Bet placed on ${selectedOption} with amount ${betAmount}`);
  };

  const onSignAndSubmitTransaction = async () => {
    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: "0x1::coin::transfer",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [account.address, betAmount],
      },
    });
    // if you want to wait for transaction
    try {
      await aptos.waitForTransaction({ transactionHash: response.hash });
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gradient-to-br from-black to-gray-800 border-2 border-solid border-gray-400 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Bet Slip</h2>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-grey-200">{match.team1} VS {match.team2}</h3>


          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src={match.team1.image} alt={match.team1.name} className="w-16 h-auto rounded-xl mb-2 mr-2" />
              <h2 className="text-2xl font-bold">{match.team1.name}</h2>
            </div>

            <div className="flex items-center">
              <img src={match.team2.image} alt={match.team2.name} className="w-16 h-auto rounded-xl mb-2 mr-2" />
              <h2 className="text-2xl font-bold">{match.team2.name}</h2>
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-200 mb-1">Select Option</label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded"
              defaultValue={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="Team A">{`${match.team1} - ${match.prob1}`}</option>
              <option value="Team B">{`${match.team2} - ${match.prob2}`}</option>
              <option value="Draw">{`Draw - ${match.prob3}`}</option>
            </select>
          </div>
          <input
            type="number"
            placeholder="Enter bet amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded mt-3 bg-gray-700 text-white"
          />
          <p className="text-sm mt-3 text-green-400">Potential Win: {calculatePotentialWin()}</p>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={handlePlaceBet}
            className="bg-custom-color text-black px-4 py-2 rounded hover:bg-green-600 transition duration-200 ease-in-out flex-grow"
          >
            Place Bet
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 ease-in-out flex-grow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BettingSlip;