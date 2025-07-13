import React from 'react';

const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`w-6 h-6 ${className}`}
  >
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.28c-.424.032-.848.032-1.272 0l-3.722-.28c-1.133-.093-1.98-1.057-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097L16.5 8.25m4.5 3.375-3.75-3.75m3.75 3.75L16.5 15.375m-3.75-3.75L12 8.25m3.75 3.375L12 15.375m-3.75-3.75L8.25 8.25m3.75 3.375L8.25 15.375M3 8.25l3.75 3.75M3 8.25l3.75-3.75M3 8.25v7.5a2.25 2.25 0 0 0 2.25 2.25h3.75m-3.75-13.5h3.75a2.25 2.25 0 0 1 2.25 2.25v3.75m-3.75-3.75h3.75a2.25 2.25 0 0 1 2.25 2.25" 
    />
  </svg>
);

export default ChatBubbleLeftRightIcon;
