export type IMessage = {
  id: string;
  content: string;
  sender: "user" | "bot";
  vote?: {
    type: "UPVOTE" | "DOWNVOTE";
    knowledgeId: string;
  };
  timestamp: Date;
};

export type IChat = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};
