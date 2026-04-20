import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, user: true };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await axios.post(
          "https://aibit-translator.p.rapidapi.com/api/v1/translator/text",
          {
            from: "auto",
            to: "en",
            text: input,
          },
          {
            headers: {
              "content-type": "application/json",
              "x-rapidapi-key": process.env.REACT_APP_API_KEY,
              "x-rapidapi-host": "aibit-translator.p.rapidapi.com",
            },
          }
        );

        const botMessage = { text: response.data.trans, user: false };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error translating message", error);
      }

      setInput("");
    }
  };

  return (
    <div className="chatContainer flex h-screen text-white">
      {/* Sidebar */}
      <div className="w-64 bg-sideBarColor p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="square bg-selectedOrange"></div>
          <h2 className="ml-2 text-2xl font-semibold">Amaizo Chat</h2>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            {[
              "Dashboard",
              "Chatbots",
              "Files",
              "Prompts",
              "File Wizard",
              "API",
              "User Guide",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="/"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center p-2 rounded hover:bg-selectedOrange"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button className="planButton mt-20 bg-selectedOrange p-2">
            View Plan
          </button>
        </nav>

        <div className="userSection flex justify-between mr-14">
          <div className="square bg-selectedOrange"></div>
          <div className="info">
            <h1>John Smith</h1>
            <h4>8 Dialogues</h4>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow bg-selectedBg flex flex-col text-white overflow-y-auto">
        {/* Top bar */}
        <div className="bg-selectedBg p-2 border-b border-gray-600">
          <button className="hover:bg-messagesBg text-white p-2 rounded-lg">
            {'>>'}
          </button>
          <button className="hover:bg-messagesBg text-white p-2 rounded-lg">
            Example Session
          </button>
          <button className="hover:bg-messagesBg text-white p-2 rounded-lg">
            Upload Files
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-6 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.user ? "justify-end" : "justify-start"
              }`}
            >
              {message.user ? (
                <div className="bg-messagesBg p-4 rounded-lg">
                  {message.text}
                </div>
              ) : (
                <div className="bg-selectedOrange p-4 rounded-lg text-black">
                  {message.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="mb-14 w-[50vw] m-auto flex items-center rounded-[20px] bg-messagesBg p-2">
          <input
            type="text"
            className="w-full text-black bg-transparent outline-none p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />

          <button
            className="bg-selectedOrange text-white p-2 rounded-full"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;