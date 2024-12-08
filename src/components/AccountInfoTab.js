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
        <h2 className="text-xl font-bold mb-4">Account Information</h2>
        <div className="mb-4">
          {isEditing ? (
            <>
              <label className="block mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full"
              />
            </>
          ) : (
            <>
              <strong>Username:</strong> {username}
            </>
          )}
        </div>
        <div className="mb-4">
          {isEditing ? (
            <>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
              />
            </>
          ) : (
            <>
              <strong>Email:</strong> {email}
            </>
          )}
        </div>
        <div className="mb-4">
          {isEditing ? (
            <>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-4">
          <strong>Game Statistics:</strong>
          <ul>
            <li>Total Games Played: 50</li>
            <li>Wins: 30</li>
            <li>Losses: 20</li>
          </ul>
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Edit
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
        <button
          onClick={handleTopUp}
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Top Up Balance
        </button>
      </div>
    </div>
  );
};

export default AccountInfoTab;
