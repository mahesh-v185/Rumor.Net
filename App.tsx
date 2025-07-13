import React, { useState } from 'react';
import { Rumor } from './types';
import { INITIAL_RUMORS } from './constants';
import HomePage from './components/Lobby';
import ChatPage from './components/GameView';

type Page = 'home' | 'chat';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [rumors, setRumors] = useState<Rumor[]>(INITIAL_RUMORS);

  const handleStartChat = () => {
    setCurrentPage('chat');
  };

  const handleEndChat = () => {
    setCurrentPage('home');
  };

  const handleAddRumor = (text: string) => {
    const newRumor: Rumor = {
      id: `rumor-${Date.now()}`,
      text,
    };
    setRumors(prevRumors => [...prevRumors, newRumor]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatPage onEndChat={handleEndChat} />;
      case 'home':
      default:
        return <HomePage rumors={rumors} onAddRumor={handleAddRumor} onStartChat={handleStartChat} />;
    }
  };

  return <>{renderPage()}</>;
};

export default App;
