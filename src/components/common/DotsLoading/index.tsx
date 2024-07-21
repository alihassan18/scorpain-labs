
// src/components/DotsLoading.js
import React from 'react';

const DotsLoading = () => {
  return (
    <div className="flex space-x-2">
      <div className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      <div className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      <div className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
      <div className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }}></div>
    </div>
  );
};

export default DotsLoading;
