export type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};
