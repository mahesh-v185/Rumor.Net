import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { Message } from '../types';
import { startChatSession, getAiResponse } from '../services/geminiService';
import XMarkIcon from './icons/EyeIcon';
import PaperAirplaneIcon from './icons/UserIcon';

interface ChatPageProps {
  onEndChat: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onEndChat }) => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatSession(startChatSession());
    setMessages([{
        id: 'intro',
        text: 'You are now connected with a stranger. Say hi!',
        sender: 'stranger'
    }])
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chatSession || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), text: userInput, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    const aiResponseText = await getAiResponse(chatSession, userInput);
    
    const aiMessage: Message = { id: Date.now().toString() + 'ai', text: aiResponseText, sender: 'stranger' };
    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white font-sans">
      <header className="flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800 flex-shrink-0">
        <h1 className="text-lg font-bold text-purple-400">Connected with a Stranger</h1>
        <button
          onClick={onEndChat}
          className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
        >
          <XMarkIcon className="h-6 w-6 text-zinc-400" />
          <span className="sr-only">Disconnect</span>
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
              msg.sender === 'user' 
                ? 'bg-purple-600 rounded-br-lg' 
                : 'bg-zinc-700 rounded-bl-lg'
            }`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="px-4 py-2 rounded-2xl bg-zinc-700 rounded-bl-lg">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-0"></span>
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse delay-300"></span>
                </div>
            </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-zinc-950 border-t border-zinc-800 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Send a message..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-full pl-5 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="p-3 bg-purple-600 rounded-full hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!userInput.trim() || isTyping}
          >
            <PaperAirplaneIcon className="h-6 w-6 text-white" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;