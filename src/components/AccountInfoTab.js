import React, { useState } from "react";

const AccountInfoTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(1000); // Example balance
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankCard, setBankCard] = useState("");

  const handleTopUp = () => {
    // Logic to top up the balance
    alert("Balance topped up!");
  };

  const handleSave = () => {
    // Logic to save the changes
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <div className="flex">
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
        <div className="mb-2">
          <div className="flex items-center">
            <label className="w-1/4 mr-2">Username</label>
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-1 w-full"
              />
            ) : (
              <strong>{username}</strong>
            )}
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center">
            <label className="w-1/4 mr-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-1 w-full"
              />
            ) : (
              <strong>{email}</strong>
            )}
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center">
            <label className="w-1/4 mr-2">Password</label>
            {isEditing ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-1 w-full"
              />
            ) : (
              <strong>********</strong>
            )}
          </div>
        </div>
        <div className="mb-2">
          <strong>Game Statistics:</strong>
          <ul>
            <li>Total Games Played: 50</li>
            <li>Wins: 30</li>
            <li>Losses: 20</li>
          </ul>
        </div>
        {isEditing && (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Save
          </button>
        )}
      </div>
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
    </div>
  );
};

export default AccountInfoTab;
