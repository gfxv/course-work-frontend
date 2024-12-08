import React, { useState } from 'react';

const AccountInfoTab = () => {
  const [balance, setBalance] = useState(1000); // Example balance
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankCard, setBankCard] = useState('');

  const handleTopUp = () => {
    // Logic to top up the balance
    alert('Balance topped up!');
  };

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-xl font-bold mb-4">Account Information</h2>
        <div className="mb-4">
          <strong>Username:</strong> JohnDoe
        </div>
        <div className="mb-4">
          <strong>Email:</strong> johndoe@example.com
        </div>
        <div className="mb-4">
          <strong>Game Statistics:</strong>
          <ul>
            <li>Total Games Played: 50</li>
            <li>Wins: 30</li>
            <li>Losses: 20</li>
          </ul>
        </div>
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
