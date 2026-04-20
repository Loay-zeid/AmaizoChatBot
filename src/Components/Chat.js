import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages((prev) => [...prev, userMessage]);

    if (!process.env.REACT_APP_API_KEY) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ API key not configured. Please set REACT_APP_API_KEY in your .env file.", user: false },
      ]);
      setInput("");
      return;
    }

    try {
      const response = await axios.post(
        "https://aibit-translator.p.rapidapi.com/api/v1/translator/text",
        { from: "auto", to: "en", text: input },
        {
          headers: {
            "content-type": "application/json",
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-host": "aibit-translator.p.rapidapi.com",
          },
          timeout: 30000,
        }
      );
      setMessages((prev) => [...prev, { text: response.data.trans, user: false }]);
    } catch (error) {
      let errorText = "❌ Error: ";
      if (error.code === "ECONNABORTED") errorText += "Request timeout";
      else if (error.response?.status === 401) errorText += "Invalid API key";
      else if (error.response?.status === 429) errorText += "Too many requests — try again later";
      else errorText += error.message;
      setMessages((prev) => [...prev, { text: errorText, user: false }]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const navItems = ["Dashboard", "Chatbots", "Files", "Prompts", "File Wizard", "API", "User Guide"];

  return (
    <div className="chatContainer flex h-screen text-white overflow-hidden">

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-sideBarColor p-6 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="square bg-selectedOrange flex-shrink-0"></div>
            <h2 className="ml-2 text-xl font-semibold truncate">Amaizo Chat</h2>
          </div>
          <button
            className="md:hidden text-white hover:text-gray-300 ml-2"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li key={i}>
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); setSidebarOpen(false); }}
                  className="flex items-center p-2 rounded hover:bg-selectedOrange text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button className="planButton mt-8 bg-selectedOrange p-2 w-full text-sm">
            View Plan
          </button>
        </nav>

        {/* User section */}
        <div className="userSection flex items-center gap-3 pt-4 border-t border-gray-600">
          <div className="square bg-selectedOrange flex-shrink-0"></div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">John Smith</p>
            <p className="text-xs text-gray-400">8 Dialogues</p>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-selectedBg overflow-hidden min-w-0">

        {/* Top bar */}
        <div className="bg-selectedBg p-2 border-b border-gray-600 flex items-center gap-1 flex-shrink-0">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden hover:bg-messagesBg text-white p-2 rounded-lg mr-1"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <button className="hover:bg-messagesBg text-white p-2 rounded-lg text-sm hidden sm:block">
            {'>>'}
          </button>
          <button className="hover:bg-messagesBg text-white p-2 rounded-lg text-sm truncate max-w-[120px] sm:max-w-none">
            Example Session
          </button>
          <button className="hover:bg-messagesBg text-white p-2 rounded-lg text-sm">
            Upload Files
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-sm">Send a message to start the conversation</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.user ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg text-sm max-w-[85%] sm:max-w-[70%] break-words ${
                  message.user
                    ? "bg-messagesBg text-white"
                    : "bg-selectedOrange text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="flex-shrink-0 p-3 sm:p-4 pb-6">
          <div className="w-full sm:w-[80%] lg:w-[60%] mx-auto flex items-center rounded-[20px] bg-messagesBg p-2 gap-2">
            <input
              type="text"
              className="flex-1 text-white bg-transparent outline-none p-2 text-sm min-w-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button
              className="bg-selectedOrange text-white px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 hover:opacity-90 transition-opacity"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
