import React, { useState } from 'react';
import { Rumor } from '../types';
import ChatBubbleLeftRightIcon from './icons/SignalIcon';

interface HomePageProps {
  rumors: Rumor[];
  onAddRumor: (text: string) => void;
  onStartChat: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ rumors, onAddRumor, onStartChat }) => {
  const [newRumor, setNewRumor] = useState('');

  const handleSubmitRumor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRumor.trim()) {
      onAddRumor(newRumor.trim());
      setNewRumor('');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-950 p-4 md:p-8 w-full">
      <div className="text-center w-full max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-black text-purple-400 tracking-tighter">RumorNet</h1>
        <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
          Connect with a random stranger. Share what you know. Stay anonymous.
        </p>
        <div className="mt-10">
          <button
            onClick={onStartChat}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <ChatBubbleLeftRightIcon />
            Connect Chat
          </button>
        </div>
      </div>

      <div className="mt-16 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-white text-center">The Rumor Mill</h2>
        <form onSubmit={handleSubmitRumor} className="mt-4 flex flex-col gap-2">
          <textarea
            value={newRumor}
            onChange={e => setNewRumor(e.target.value)}
            placeholder="Heard something interesting? Share it here..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            rows={3}
          />
          <button
            type="submit"
            className="bg-zinc-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newRumor.trim()}
          >
            Share Anonymously
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {rumors.slice().reverse().map(rumor => (
            <div key={rumor.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <p className="text-zinc-300">{rumor.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;