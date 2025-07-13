// Message in a 1-on-1 chat
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'stranger';
}

// A publicly shared rumor
export interface Rumor {
  id: string;
  text: string;
}
