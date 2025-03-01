"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Button,
  Avatar,
  List,
  Typography,
  theme,
} from "antd";
import {
  SendOutlined,
  MessageOutlined,
  PlusOutlined,
  UserOutlined,
  RobotOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};

export default function ChatPage() {
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState("1");

  // Sample data
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Pertanyaan tentang Rukun Nikah",
      lastMessage: "Apa saja rukun nikah dalam Islam?",
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "Tentang Mahar",
      lastMessage: "Berapa minimal mahar dalam Islam?",
      timestamp: new Date(),
    },
    {
      id: "3",
      title: "Wali Nikah",
      lastMessage: "Siapa saja yang bisa menjadi wali nikah?",
      timestamp: new Date(),
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Apa saja rukun nikah dalam Islam?",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: "2",
      content:
        "Rukun pernikahan dalam Islam ada 5, yaitu:\n\n1. Calon suami\n2. Calon istri\n3. Wali nikah\n4. Dua orang saksi\n5. Ijab dan Qabul\n\nSemua rukun di atas harus terpenuhi agar pernikahan dianggap sah secara syariat Islam.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, newUserMessage]);
      setInput("");

      // Simulate bot response (in real app, this would be an API call)
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "Mohon tunggu sebentar, saya sedang mencari jawaban untuk pertanyaan Anda.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "Chat Baru",
      lastMessage: "",
      timestamp: new Date(),
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={280}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          overflow: "auto",
        }}
      >
        <div style={{ padding: "16px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleNewChat}
            style={{
              width: "100%",
              backgroundColor: token.colorPrimary,
              borderRadius: "8px",
            }}
          >
            {!collapsed && "Chat Baru"}
          </Button>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[activeChat]}
          style={{
            border: "none",
            background: token.colorBgContainer,
          }}
        >
          {chats.map((chat) => (
            <Menu.Item
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              icon={<MessageOutlined />}
              style={{
                margin: "4px 8px",
                borderRadius: "8px",
                height: "auto",
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              {!collapsed && (
                <>
                  <div style={{ fontWeight: 500 }}>{chat.title}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: token.colorTextSecondary,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {chat.lastMessage || "Belum ada pesan"}
                  </div>
                </>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            {chats.find((chat) => chat.id === activeChat)?.title || "Chat Baru"}
          </Title>
        </Header>

        <Content
          style={{
            padding: "24px",
            overflowY: "auto",
            background: token.colorBgLayout,
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message) => (
              <List.Item
                style={{
                  padding: "12px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    maxWidth: "80%",
                    gap: "12px",
                  }}
                >
                  <Avatar
                    icon={
                      message.sender === "user" ? (
                        <UserOutlined />
                      ) : (
                        <RobotOutlined />
                      )
                    }
                    style={{
                      backgroundColor:
                        message.sender === "user"
                          ? token.colorPrimary
                          : token.colorSuccess,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background:
                        message.sender === "user"
                          ? `${token.colorPrimaryBg}`
                          : token.colorBgContainer,
                      border: `1px solid ${
                        message.sender === "user"
                          ? token.colorPrimaryBorder
                          : token.colorBorderSecondary
                      }`,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Content>

        <div
          style={{
            padding: "16px 24px 24px",
            background: token.colorBgContainer,
            borderTop: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pertanyaan Anda di sini..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            style={{
              borderRadius: "8px",
              padding: "12px",
              resize: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Tekan Enter untuk mengirim, Shift+Enter untuk baris baru
            </Text>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              style={{
                borderRadius: "8px",
                backgroundColor: token.colorPrimary,
              }}
            >
              Kirim
            </Button>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}
