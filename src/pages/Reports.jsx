import { useEffect, useState } from "react";
import { useChats } from "../contexts/ChatsContext";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";
import UserRequests from "../components/HouseRequests";

const Reports = () => {
  const { token, user } = useAuth();
  const { fetchChats, fetchChat, chats, chat, isLoading } = useChats();
  const [query, setQuery] = useState("msg");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (!chat?.data?.id) return;

    const chatId = chat?.data?.id;
    if (Array.isArray(chat.data.messages)) {
      setMessages(chat.data.messages);
    }

    const interval = setInterval(() => {
      fetchChat(chatId);
    }, 5000);

    return () => clearInterval(interval);
  }, [chat?.data?.messages, chat?.data?.id]);

  const handleChatClick = async (id) => {
    await fetchChat(id);
    setShowChat(true);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender: { id: user?.id },
      id: messages.length + 1,
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/chats/${chat?.data?.id}/messages`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );

      if (!response.ok) console.error("Failed to send message");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDateHeader = (dateStr) => {
    const today = new Date();
    const msgDate = new Date(dateStr);
    const isToday = today.toDateString() === msgDate.toDateString();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = yesterday.toDateString() === msgDate.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return msgDate.toLocaleDateString();
  };

  const groupMessagesByDate = () => {
    const grouped = {};
    messages.forEach((msg) => {
      const day = new Date(msg.createdAt).toDateString();
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(msg);
    });
    return grouped;
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 h-[100dvh] overflow-hidden bg-gray-50">
      {/* Mobile Header */}
      {isMobileView && showChat && (
        <div className="flex items-center justify-between p-3 bg-white shadow-sm md:hidden">
          <button
            onClick={() => setShowChat(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-[#00a256]">
            {chat?.data?.user?.fullName}
          </h2>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      )}

      {/* Left Sidebar Navigation - Hidden on mobile when chat is open */}
      {(!isMobileView || !showChat) && (
        <div className="flex flex-col gap-3 w-full md:w-1/4">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold text-[#100073] mb-4">Reports</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setQuery("msg")}
                className={`${
                  query === "msg"
                    ? "bg-[#00a256] text-white"
                    : "bg-gray-100 text-[#100073] hover:bg-gray-200"
                } p-3 rounded-lg font-medium flex items-center gap-2 transition-colors`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Support Queries
              </button>
              <button
                onClick={() => setQuery("rqs")}
                className={`${
                  query === "rqs"
                    ? "bg-[#00a256] text-white"
                    : "bg-gray-100 text-[#100073] hover:bg-gray-200"
                } p-3 rounded-lg font-medium flex items-center gap-2 transition-colors`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                House Requests
              </button>
            </div>
          </div>

          {/* Chat List - Only show when in msg mode */}
          {query === "msg" && (
            <div className="bg-white rounded-xl shadow p-4 flex-1 overflow-hidden flex flex-col">
              <h2 className="text-lg font-semibold mb-4 text-[#100073] flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                Chats
              </h2>
              <div className="overflow-y-auto flex-1">
                {chats.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-2 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <p>No chats available</p>
                  </div>
                ) : (
                  chats.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleChatClick(item.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all mb-2 ${
                        chat?.data?.id === item.id
                          ? "border border-[#100073] bg-[#f4f6ff]"
                          : "border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-[#100073] text-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                          {item?.user?.fullName?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#100073] truncate">
                            {item?.user?.fullName || "Unknown User"}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {item?.user?.role || "User"}
                          </p>
                          <p className="text-gray-400 text-xs truncate mt-1">
                            {item?.messages?.at(-1)?.message ||
                              "No messages yet"}
                          </p>
                        </div>
                        {item?.messages?.at(-1)?.createdAt && (
                          <div className="text-xs text-gray-400 whitespace-nowrap">
                            {new Date(
                              item.messages.at(-1).createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      {query === "msg" ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Interface - Show on desktop or when chat is selected on mobile */}
          {showChat && chat?.data?.id && (
            <div className="bg-white rounded-xl shadow flex flex-col h-full border border-[#00a256] overflow-hidden">
              {/* Chat Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-[#100073] text-white rounded-full h-10 w-10 flex items-center justify-center">
                    {chat.data.user?.fullName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#00a256]">
                      {chat.data.user?.fullName || "Unknown User"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {chat.data.user?.role || "User"}
                    </p>
                  </div>
                </div>
                {!isMobileView && (
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {Object.entries(groupMessagesByDate()).map(
                  ([date, msgs], i) => (
                    <div key={i}>
                      <div className="flex justify-center my-4">
                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {formatDateHeader(date)}
                        </span>
                      </div>
                      {msgs.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.sender.id === user.id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div className="max-w-[80%]">
                            <div
                              className={`p-3 rounded-2xl text-sm ${
                                msg.sender.id === user.id
                                  ? "bg-[#00a256] text-white rounded-br-none"
                                  : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                              }`}
                            >
                              {msg.message}
                            </div>
                            <span
                              className={`text-xs text-gray-500 mt-1 block ${
                                msg.sender.id === user.id
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              {new Date(msg?.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>

              {/* Message Input */}
              <div className="p-3 border-t bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00a256] focus:border-transparent"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-[#100073] text-white p-3 rounded-full hover:bg-[#1a008f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State when no chat is selected */}
          {!showChat && (
            <div className="flex-1 flex items-center justify-center bg-white rounded-xl shadow">
              <div className="text-center p-8 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto mb-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <h3 className="text-lg font-medium mb-2">
                  Select a conversation
                </h3>
                <p>Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1">
          <UserRequests />
        </div>
      )}
    </div>
  );
};

export default Reports;
