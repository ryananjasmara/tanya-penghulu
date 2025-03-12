import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IMessage, IChat } from "@/types/chat";

interface ChatStore {
  chats: IChat[];
  messages: Record<string, IMessage[]>;
  activeChat: string | null;
  addChat: () => string;
  setActiveChat: (id: string) => void;
  addMessage: (chatId: string, content: string, sender: "user" | "bot") => void;
  updateChatTitle: (chatId: string, title: string) => void;
  deleteChat: (id: string) => void;
  addVote: (
    chatId: string,
    messageIndex: number,
    vote: { type: "UPVOTE" | "DOWNVOTE"; knowledgeId: string }
  ) => void;
  hasVoted: (chatId: string, knowledgeId: string) => boolean;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      messages: {},
      activeChat: "",

      addChat: () => {
        const newChat: IChat = {
          id: Date.now().toString(),
          title: "Chat Baru",
          lastMessage: "",
          timestamp: new Date(),
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChat: newChat.id,
          messages: {
            ...state.messages,
            [newChat.id]: [],
          },
        }));

        return newChat.id;
      },

      setActiveChat: (chatId) => {
        set({ activeChat: chatId });
      },

      addMessage: (chatId, content, sender) => {
        const newMessage: IMessage = {
          id: Date.now().toString(),
          content,
          sender,
          timestamp: new Date(),
        };

        set((state) => {
          const chatMessages = state.messages[chatId] || [];
          const isFirstMessage = chatMessages.length === 0 && sender === "user";

          const updatedChats = state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  lastMessage: content,
                  timestamp: new Date(),
                  title: isFirstMessage ? content : chat.title,
                }
              : chat
          );

          return {
            messages: {
              ...state.messages,
              [chatId]: [...chatMessages, newMessage],
            },
            chats: updatedChats,
          };
        });
      },

      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        }));
      },

      deleteChat: (chatId) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          messages: Object.fromEntries(
            Object.entries(state.messages).filter(([key]) => key !== chatId)
          ),
          activeChat: state.activeChat === chatId ? null : state.activeChat,
        }));
      },

      addVote: (chatId, messageIndex, vote) => {
        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: state.messages[chatId].map((msg, index) =>
              index === messageIndex ? { ...msg, vote } : msg
            ),
          },
        }));
      },

      hasVoted: (chatId, knowledgeId) => {
        const messages = get().messages[chatId] || [];
        return messages.some((msg) => msg.vote?.knowledgeId === knowledgeId);
      },
    }),
    {
      name: "chat-storage",
    }
  )
);
