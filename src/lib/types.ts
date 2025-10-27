export type Interest = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type User = {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  avatarUrl: string;
  avatarHint: string;
  isVerified: boolean;
  bio: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type Chat = {
  id: string;
  userIds: string[];
  messages: Message[];
};
