import React, { useEffect, useState } from "react";
import AdminNav from "../Admin_nav/Admin_nav";
import axios from "axios";
import { IoSend } from "react-icons/io5";

const AdminMessage = () => {
  const [userMessage, setUserMessage] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [partMessage, setPartMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/message/")
      .then((res) => {
        const uniqueUserIds = [
          ...new Set(res.data.map((message) => message.userId)),
        ];

        setUserMessage(uniqueUserIds);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);
  
  const handleUserClick = (userId) => {
    axios.get(`http://localhost:8000/api/message/${userId}`).then((res) => {
      setPartMessage(res.data);
      setSelectedUserId(userId);
    });
  };

  

  const handleSendMessage = () => {
    const adminUserId = "replace_with_actual_admin_userId";

    axios
      .post("http://localhost:8000/api/message/", {
        userId: selectedUserId,
        adminMessage: newMessage,
      })
      .then((res) => {
        setNewMessage("");
        // Update messages display or handle the response in another way
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div>
      <AdminNav />
      <div className="m-auto w-[50%] h-[40%]">
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-[80%] w-full overflow-x-hidden">
          <div className="flex flex-col py-[20px] pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  2
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                {userMessage.map((userId) => (
                  <button
                    key={userId}
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                    onClick={() => handleUserClick(userId)}
                  >
                    <div className="ml-2 text-sm font-semibold">{userId}</div>
                  </button>
                ))}
              </div>
              <div className="flex flex-row items-center justify-between text-xs mt-6">
                <span className="font-bold">Archived</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  1
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2">
                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">65616e90f81da27da97f65h5</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {partMessage.map((message) => (
                      <div
                        key={message._id}
                        className={`col-start-${
                          message.adminMessage ? "6" : "1"
                        }
                         col-end-${
                          message.adminMessage ? "13" : "8"
                        } p-3 rounded-lg`}
                      >
                        <div className="flex flex-row items-center">
                          <div
                            className={`relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl ${
                              message.adminMessage ? "bg-indigo-100" : ""
                            }`}
                          >
                            <div>
                              {message.adminMessage ? (
                                <div className="	text-align: end">
                                  {message.adminMessage}
                                </div>
                              ) : (
                                <div className="user-message">
                                  {message.userMessage}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                    >
                      <IoSend className="text-3xl"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminMessage;
