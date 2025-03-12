"use client";

import { ChatForm } from "./__partials__/ChatForm";
import { useCreateMissingAnswer, useCreateVote, useGetAllKnowledge } from "@/services/queries";
import { useChatStore } from "@/stores/useChatStore";
import { findMatchingKnowledge } from "@/utils/functions/knowledge-matcher";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  PlusOutlined,
  RobotOutlined,
  UserOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Layout,
  List,
  Popconfirm,
  Typography,
  message,
} from "antd";
import { Grid } from "antd";
import { theme } from "antd";
import { Outfit } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800"],
});

export default function ChatPage() {
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
    addVote,
    hasVoted,
  } = useChatStore();

  const { data: knowledges } = useGetAllKnowledge({
    page: 1,
    limit: 1000,
  });

  const { mutate: createMissingAnswer } = useCreateMissingAnswer();

  const { mutate: createVote } = useCreateVote();

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
        knowledges?.data || [],
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

  useEffect(() => {
    setCollapsed(!screens.md);
  }, [screens.md]);

  const handleVote = async (
    botMessage: any,
    voteType: "UPVOTE" | "DOWNVOTE"
  ) => {
    if (!activeChat) return;

    const botMessageIndex = currentMessages.findIndex(
      (msg) => msg.content === botMessage.content
    );

    const userMessage =
      botMessageIndex > 1 ? currentMessages[botMessageIndex - 2] : null;

    if (!userMessage || userMessage.sender !== "user") {
      message.error("Tidak dapat menemukan pertanyaan terkait");
      return;
    }

    const matchingKnowledge = findMatchingKnowledge(
      knowledges?.data || [],
      botMessage.content
    );

    if (!matchingKnowledge) {
      message.error("Tidak dapat menemukan knowledge untuk jawaban ini");
      return;
    }

    // Check if already voted
    if (hasVoted(activeChat, matchingKnowledge.id)) {
      message.info("Anda sudah memberikan feedback untuk jawaban ini");
      return;
    }

    try {
      await createVote({
        question: userMessage.content,
        knowledgeId: matchingKnowledge.id,
        vote: voteType,
      });

      // Add vote to message
      addVote(activeChat, botMessageIndex, {
        type: voteType,
        knowledgeId: matchingKnowledge.id,
      });

      message.success(
        voteType === "UPVOTE"
          ? "Terima kasih atas feedback positifnya!"
          : "Terima kasih atas feedback Anda"
      );
    } catch (error) {
      message.error("Gagal memberikan feedback");
    }
  };

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
                icon={<ArrowLeftOutlined />}
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
                      alignItems: "flex-start",
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
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
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

                      {message.sender === "bot" &&
                        !message.content.includes(
                          "Mohon tunggu sebentar, saya sedang mencari jawaban untuk pertanyaan Anda."
                        ) && (
                          <div
                            style={{
                              display: "flex",
                              gap: "16px",
                              alignItems: "center",
                              padding: "0 8px",
                            }}
                          >
                            {(() => {
                              const knowledge = findMatchingKnowledge(
                                knowledges?.data || [],
                                message.content
                              );
                              const voted = knowledge
                                ? hasVoted(activeChat, knowledge.id)
                                : false;

                              return voted ? (
                                <Text
                                  type="secondary"
                                  style={{ fontSize: "12px" }}
                                >
                                  Terima kasih atas feedback Anda
                                </Text>
                              ) : (
                                <>
                                  <Button
                                    type="text"
                                    icon={<LikeOutlined />}
                                    size="small"
                                    onClick={() =>
                                      handleVote(message, "UPVOTE")
                                    }
                                  />
                                  <Button
                                    type="text"
                                    icon={<DislikeOutlined />}
                                    size="small"
                                    onClick={() =>
                                      handleVote(message, "DOWNVOTE")
                                    }
                                  />
                                </>
                              );
                            })()}
                          </div>
                        )}
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
