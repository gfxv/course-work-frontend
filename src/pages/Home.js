import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900">Home Page</h1>
      </div>
    </>
  );
};

export default Home;
