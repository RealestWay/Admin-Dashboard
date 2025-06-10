import React, { useEffect, useState } from "react";
import { useChats } from "../contexts/ChatsContext";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";

const Reports = () => {
  const { token, user } = useAuth();
  const { fetchChats, fetchChat, chats, chat, isLoading, loadingChat } =
    useChats();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchChats(); // Load all chats when component mounts
  }, []);

  useEffect(() => {
    if (!chat?.data?.id) return;

    const chatId = chat.data.id;

    if (Array.isArray(chat.data.messages)) {
      setMessages(chat.data.messages);
    }

    const interval = setInterval(() => {
      fetchChat(chatId);
    }, 5000);

    return () => clearInterval(interval);
  }, [chat?.data?.id]);

  const handleChatClick = async (id) => {
    await fetchChat(id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      sender_id: user.id,
      id: messages.length + 1,
      message: newMessage,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/chats/${chat.data.id}/messages`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );

      if (!response.ok) console.error("Failed to send message");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen">
      {/* Chat list */}
      <div className="md:w-1/3 bg-white rounded-lg shadow-lg p-4 border border-[#100073]">
        <h2 className="text-lg font-bold mb-3 text-[#100073]">All Chats</h2>
        <div className="space-y-2 overflow-y-auto max-h-[80vh]">
          {chats.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChatClick(item.id)}
              className={`cursor-pointer p-3 rounded-lg border hover:bg-[#f4f6ff] ${
                chat?.data?.id === item.id
                  ? "border-[#100073] bg-[#f4f6ff]"
                  : "border-gray-200"
              }`}
            >
              <p className="text-blue-600 font-semibold">
                Chat with {user.companyName ? chat?.user_id : chat?.agent_id}
              </p>
              <p className="text-gray-500 text-sm">House: {chat?.houseTitle}</p>
              <p className="text-gray-400 text-xs">
                Last message: {chat?.messages?.at(-1)?.message || "No message"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbox area */}
      {chat?.data?.id && (
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-4 border border-[#00a256]">
          <h2 className="text-lg font-bold mb-3 text-[#00a256]">
            Chat with {chat.data.user?.uniqueId || chat.data.agent?.uniqueId}
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[70vh] space-y-2 px-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-sm ${
                  msg.sender_id === user.id
                    ? "bg-[#00a256] text-white ml-auto"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="flex mt-4 border-t pt-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#100073] text-white px-4 py-2 rounded-r-lg hover:bg-[#120089] transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
