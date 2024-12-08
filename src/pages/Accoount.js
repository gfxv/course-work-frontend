import React, { useState } from 'react';
import Header from '../components/Header';
import AccountInfoTab from '../components/AccountInfoTab';

const Account = () => {
  const [activeTab, setActiveTab] = useState('accountInfo');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'accountInfo':
        return <AccountInfoTab />;
      case 'friendsList':
        return <div>Friends list here</div>;
      case 'history':
        return <div>History here</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('accountInfo')}
              className={`flex-1 p-4 text-center cursor-pointer ${
                activeTab === 'accountInfo' ? 'border-b-2 border-blue-500 text-blue-500' : ''
              }`}
            >
              Account Info
            </button>
            <button
              onClick={() => setActiveTab('friendsList')}
              className={`flex-1 p-4 text-center cursor-pointer ${
                activeTab === 'friendsList' ? 'border-b-2 border-blue-500 text-blue-500' : ''
              }`}
            >
              Friends List
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 p-4 text-center cursor-pointer ${
                activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-500' : ''
              }`}
            >
              History
            </button>
          </div>
          <div className="mt-4">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Account;
