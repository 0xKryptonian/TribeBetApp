import React from 'react';
import { atom, useAtom } from 'jotai'
import { walletAddressAtom } from "@/lib/state";

const StaticLeaderboard = () => {
  const leaderboardData = [
    { user: 'User1', team: 'Team A', amountBetted: 50, odds: 2.5 },
    { user: 'User2', team: 'Team B', amountBetted: 30, odds: 3.0 },
    { user: 'User3', team: 'Team A', amountBetted: 20, odds: 2.5 },
    // Add more data as needed
  ];

  const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);
  console.log("wallet address", walletAddress);

  return (
    <div className='absolute w-full p-4 content-center mt-4'>

      <div className="bg-transparent  border-2 border-solid border-white p-1 ">
        <h1 className="text-2xl font-semibold mb-4">Bets</h1>
        <div className="overflow-x-auto text-center">
          <table className="min-w-full bg-transparent  border-2 border-solid border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-2 border-b">User</th>
                <th className="py-2 px-2 border-b">Bet on Team</th>
                <th className="py-2 px-2 border-b">Amount Betted</th>
                <th className="py-2 px-2 border-b">Odds</th>
                <th className="py-2 px-2 border-b">Amount to Win</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-transparent' : ''}>
                  <td className="py-2 px-4 border-b">{entry.user}</td>
                  <td className="py-2 px-4 border-b">{entry.team}</td>
                  <td className="py-2 px-4 border-b">${entry.amountBetted}</td>
                  <td className="py-2 px-4 border-b">{entry.odds}</td>
                  <td className="py-2 px-4 border-b">${(entry.amountBetted * entry.odds).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaticLeaderboard;
