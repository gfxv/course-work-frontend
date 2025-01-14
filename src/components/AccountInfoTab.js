import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import API_URL from "../config";
import { AuthContext } from "../context/AuthContext";

const AccountInfoTab = () => {
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [userId, setUserId] = useState(-1);
  const [username, setUsername] = useState("");
  const [gamesHosted, setGamesHosted] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  const [balance, setBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankCard, setBankCard] = useState("");

  const { authState, logout } = useContext(AuthContext);
  const token = authState.token;

  const handleTopUp = () => {
    alert("Balance topped up!");
  };

  const handleUpdateUsername = async () => {
    if (currentName === username) {
      setIsEditing(false);
      return;
    }

    if (!username) {
      setUsername(currentName);
      setIsEditing(false);
      return;
    }

    const data = {
      new_username: username,
    }
    
    try {
      const response = await axios.patch(`${API_URL}/user/update_username`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      if (response.data.status.toLowerCase() === 'success') {
        setCurrentName(username);
        setIsEditing(false);
        setError('');
        logout();
      } else {
        alert(response.data.message || 'Failed to update username');
        setIsEditing(false);
        setUsername(currentName);
      }
    } catch (err) {
      alert('An error occurred while updating the username');
      setIsEditing(false);
      setUsername(currentName);
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/get_user_info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status.toLowerCase() === "success") {
          setUserId(response.data.user.id);
          setUsername(response.data.user.username);
          setBalance(response.data.user.balance);
          setGamesHosted(response.data.usersStats.games_hosted);
          setGamesPlayed(response.data.usersStats.games_played);
          setGamesWon(response.data.usersStats.wins);
          setGamesLost(response.data.usersStats.losses);

          setCurrentName(response.data.user.username); // for better update_name logic
        } else {
          setError(
            response.data.message || "Failed to fetch your account info"
          );
        }
      } catch (err) {
        setError("An error occurred while fetching account info");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="flex">
      {error && (
        <div className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {!error && (
        <div className="w-1/2 pr-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Account Information</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
          <div className="mb-3">
            <div className="flex items-center">
              <label className="w-1/3 mr-2">Id</label>
              <strong>{userId}</strong>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 mr-2">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-1 w-fit h-fit"
                />
              ) : (
                <strong>{username}</strong>
              )}
            </div>
          </div>
          <div className="mb-2">
            <div className="flex items-center">
              <label className="w-1/3 mr-2">Games hosted</label>
              <strong>{gamesHosted}</strong>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 mr-2">Games Played</label>
              <strong>{gamesPlayed}</strong>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 mr-2">Wins</label>
              <strong>{gamesWon}</strong>
            </div>
            <div className="flex items-center">
              <label className="w-1/3 mr-2">Losses</label>
              <strong>{gamesLost}</strong>
            </div>

            {gamesPlayed != 0 && (
              <div className="flex items-center">
                <label className="w-1/3 mr-2">Winrate</label>
                <strong>{gamesWon / gamesPlayed}</strong>
              </div>
            )}

            {gamesPlayed === 0 && (
              <div className="flex items-center">
                <label className="w-1/3 mr-2">Winrate</label>
                <strong>No data</strong>
              </div>
            )}
          </div>
          {isEditing && (
            <button
              onClick={handleUpdateUsername}
              className="bg-green-500 text-white p-2 rounded w-full"
            >
              Save
            </button>
          )}
        </div>
      )}

      {!error && (
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold mb-4">Current Balance</h2>
          <div className="mb-4">
            <strong>Balance:</strong> ${balance}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bank Card</label>
            <input
              type="text"
              value={bankCard}
              onChange={(e) => setBankCard(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter Bank Card Number"
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleTopUp}
              className="bg-green-500 text-white mt-4 p-2 rounded w-1/3"
            >
              Top Up Balance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInfoTab;
