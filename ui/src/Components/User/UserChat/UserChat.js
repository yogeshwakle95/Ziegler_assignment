import React, { useEffect, useState } from "react";
import Header from "../UserNav/Header";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import Footer from "../Footer/Footer";

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/message/${userId}`).then((res) => {
      setMessages(res.data);
    });
  }, [userId]);

  const handleSendMessage = () => {
    axios
      .post(`http://localhost:8000/api/message/`, {
        userId: userId,
        userMessage: newMessage,
      })
      .then((res) => {
        setNewMessage("");
        setMessages([...messages, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full mt-2 space-x-3 max-w-xs ${
                  message.userMessage
                    ? "ml-auto justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.userMessage
                      ? "bg-blue-600 text-white rounded-l-lg rounded-br-lg"
                      : "bg-gray-300 rounded-r-lg rounded-bl-lg"
                  } p-3`}
                >
                  <p className="text-sm">{message.adminMessage || message.userMessage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-300 p-4 flex items-center">
            <input
              className="flex items-center h-10 w-full rounded px-3 text-sm relative"
              type="text"
              placeholder="Type your message…"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="absolute ml-[500px] text-gray-400 hover:text-gray-600 text-2xl"
              onClick={handleSendMessage}
            >
              <IoSend />
            </button>
          </div>
        </div>
      </div>
      <Footer/>
          </div>
  );
};

export default UserChat;
