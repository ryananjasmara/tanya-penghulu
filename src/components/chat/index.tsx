"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Layout,
  Button,
  Avatar,
  List,
  Typography,
  theme,
  Popconfirm,
  Grid,
} from "antd";
import {
  PlusOutlined,
  UserOutlined,
  RobotOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Outfit } from "next/font/google";
import { useChatStore } from "@/stores/useChatStore";
import { findMatchingKnowledge } from "@/utils/knowledge-matcher";
import { MenuOutlined } from "@ant-design/icons";
import { useGetAllKnowledge } from "@/services/queries/knowledge";
import { useCreateMissingAnswer } from "@/services/queries/missing-answer";
import { ChatForm } from "./partials/ChatForm";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800"],
});

export function ChatClient() {
  const { token } = useToken();
  const screens = Grid.useBreakpoint();
  const [collapsed, setCollapsed] = useState(!screens.md);

  const {
    chats,
    messages,
    activeChat,
    addChat,
    setActiveChat,
    addMessage,
    deleteChat,
  } = useChatStore();

  const { data: knowledges } = useGetAllKnowledge({
    page: 1,
    limit: 1000,
  });

  const { mutate: createMissingAnswer } = useCreateMissingAnswer();

  const isNewChat = !activeChat;
  const currentMessages = useMemo(
    () => (activeChat ? messages[activeChat] : []),
    [activeChat, messages]
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const sendBotResponse = (chatId: string, userMessage: string) => {
    addMessage(
      chatId,
      "Mohon tunggu sebentar, saya sedang mencari jawaban untuk pertanyaan Anda.",
      "bot"
    );

    setTimeout(() => {
      const matchingKnowledge = findMatchingKnowledge(
        knowledges || [],
        userMessage
      );

      if (!matchingKnowledge) {
        createMissingAnswer({ question: userMessage });
      }

      setTimeout(() => {
        addMessage(
          chatId,
          matchingKnowledge?.answer ||
            "Maaf, saya tidak menemukan jawaban yang sesuai dengan pertanyaan Anda. Mohon ajukan pertanyaan lain tentang pernikahan dalam Islam.",
          "bot"
        );
      }, 1000);
    }, 500);
  };

  const handleSend = (message: string) => {
    if (!knowledges) return;

    if (isNewChat) {
      const newChatId = addChat();
      addMessage(newChatId, message, "user");
      sendBotResponse(newChatId, message);
    } else {
      if (!activeChat) return;
      addMessage(activeChat, message, "user");
      sendBotResponse(activeChat, message);
    }
  };

  const handleNewChat = () => {
    if (isNewChat && screens.md) return;

    setActiveChat("");

    if (!screens.md) {
      setCollapsed(true);
    }
  };

  React.useEffect(() => {
    setCollapsed(!screens.md);
  }, [screens.md]);

  return (
    <Layout>
      <Sider
        width={screens.md ? 280 : "100vw"}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={screens.md ? 80 : 0}
        breakpoint="md"
        trigger={screens.md ? undefined : null}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: !screens.md && !collapsed ? 10 : 1,
        }}
      >
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: !screens.md ? "space-between" : "flex-start",
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleNewChat}
              disabled={isNewChat && screens.md}
              style={{
                flex: 1,
                height: "45px",
                borderRadius: "8px",
                background:
                  isNewChat && screens.md
                    ? token.colorBgContainer
                    : `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
                border:
                  isNewChat && screens.md
                    ? `1px solid ${token.colorBorder}`
                    : "none",
                boxShadow:
                  isNewChat && screens.md
                    ? "none"
                    : "0 4px 14px 0 rgba(0,118,255,0.39)",
                transition: "all 0.3s ease",
                color:
                  isNewChat && screens.md ? token.colorTextDisabled : "#fff",
                cursor: isNewChat && screens.md ? "not-allowed" : "pointer",
              }}
            >
              {(!collapsed || !screens.md) && "Obrolan Baru"}
            </Button>
          </div>

          {(!collapsed || !screens.md) && (
            <div
              style={{
                flex: 1,
                overflow: "auto",
                background: token.colorBgContainer,
              }}
            >
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  style={{
                    padding: "12px 16px",
                    margin: "4px 8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background:
                      activeChat === chat.id
                        ? token.colorPrimaryBg
                        : "transparent",
                    border: `1px solid ${
                      activeChat === chat.id
                        ? token.colorPrimaryBorder
                        : "transparent"
                    }`,
                    transition: "all 0.3s ease",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setActiveChat(chat.id);
                    if (!screens.md) {
                      setCollapsed(true);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: 1,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 500,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: screens.md ? "200px" : "75vw",
                        }}
                      >
                        {chat.title}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: token.colorTextSecondary,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: screens.md ? "200px" : "75vw",
                        }}
                      >
                        {chat.lastMessage}
                      </div>
                    </div>
                  </div>

                  <Popconfirm
                    title="Hapus obrolan"
                    description="Ini akan menghapus semua pesan di obrolan ini."
                    onConfirm={(e) => {
                      e?.stopPropagation();
                      deleteChat(chat.id);
                      if (activeChat === chat.id) {
                        setActiveChat("");
                      }
                    }}
                    onCancel={(e) => e?.stopPropagation()}
                    okText="Ya"
                    cancelText="Tidak"
                    okButtonProps={{
                      style: {
                        background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
                        border: "none",
                        boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
                        width: "80px",
                        height: "32px",
                      },
                    }}
                    cancelButtonProps={{
                      style: {
                        border: `1px solid ${token.colorBorder}`,
                        color: token.colorTextSecondary,
                        width: "80px",
                        height: "32px",
                      },
                    }}
                  >
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        opacity: 0.6,
                        transition: "opacity 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.6";
                      }}
                    />
                  </Popconfirm>
                </div>
              ))}
            </div>
          )}
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: screens.md ? (collapsed ? 80 : 280) : 0,
          transition: "all 0.2s",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Header
          style={{
            padding: screens.md ? "0 24px" : "0 16px",
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            display: "flex",
            alignItems: "center",
            height: "64px",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          {!screens.md && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ marginRight: "16px" }}
              />
            </div>
          )}
          <Title
            level={4}
            className={outfit.className}
            style={{
              margin: 0,
              background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: screens.md ? "100vw" : "85vw",
            }}
          >
            {isNewChat
              ? ""
              : chats.find((chat) => chat.id === activeChat)?.title}
          </Title>
        </Header>

        <Content
          style={{
            height: "100%",
            overflow: "auto",
            background: token.colorBgContainer,
            padding: screens.md ? "24px" : "16px",
            marginTop: "64px",
            marginBottom: "80px",
            position: "relative",
          }}
        >
          {isNewChat ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: token.colorTextSecondary,
              }}
            >
              <Title
                level={3}
                className={outfit.className}
                style={{
                  margin: 0,
                  background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Temukan Jawaban untuk Pernikahan dalam Islam
              </Title>
            </div>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={currentMessages}
              renderItem={(message) => (
                <List.Item
                  style={{
                    padding: "12px 0",
                    border: "none",
                    display: "flex",
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      maxWidth: "80%",
                      flexDirection:
                        message.sender === "user" ? "row" : "row-reverse",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      size={32}
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
                            ? "#E6F4FF"
                            : token.colorBgContainer,
                        border: `1px solid ${
                          message.sender === "user"
                            ? "#BAE0FF"
                            : token.colorBorderSecondary
                        }`,
                        whiteSpace: "pre-wrap",
                        maxWidth: "100%",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Text
                        style={{
                          display: "block",
                          maxWidth: "600px",
                          wordWrap: "break-word",
                        }}
                      >
                        {message.content}
                      </Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          )}

          <div ref={messagesEndRef} style={{ height: 0 }} />
        </Content>

        <ChatForm onSubmit={handleSend} />
      </Layout>
    </Layout>
  );
}
