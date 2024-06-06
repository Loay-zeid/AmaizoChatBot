import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Chat = ({ setPage }) => {
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
      setMessages([...messages, userMessage]);

      // Call AiBit Translator API
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
              "x-rapidapi-key":
                "82aa2b1fbbmsh4ef73325297a2f5p1bea3bjsnba30f3e7d41a",
              "x-rapidapi-host": "aibit-translator.p.rapidapi.com",
            },
          }
        );

        const botMessage = { text: response.data.trans, user: false }; // Use the translated text from the response
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error translating message", error);
      }
      setInput("");
    }
  };

  return (
    <div className=" chatContainer flex h-screen text-white">
      {/* Sidebar */}
      <div className="w-64 bg-sideBarColor p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="square bg-selectedOrange"> </div>
          <h2 className="ml-2 text-2xl font-semibold">Amaizo Chat</h2>
          <hr className="color-selected selectedBg"></hr>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className=" edit flex items-center p-2 rounded hover: bg-selectedOrange w-1  "
              >
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded hover:bg-selectedOrange"
              >
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </span>
                Chatbots
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded hover:bg-selectedOrange"
              >
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </span>
                Files
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded hover:bg-selectedOrange"
              >
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </span>
                Prompts
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded hover:bg-selectedOrange"
              >
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                </span>
                File Wizard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded hover:bg-selectedOrange"
              >
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                    />
                  </svg>
                </span>
                API
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded hover:bg-selectedOrange"
              >
                <span className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </span>
                User Guide
              </a>
            </li>
          </ul>
          <button className="planButton mt-20 bg-selectedOrange p-2 ">
            View Plan
          </button>
        </nav>
        <div>
          <div className="userSection flex justify-between mr-14 flex-rows">
            <div className="square bg-selectedOrange"> </div>
            <div className="info">
              <h1> John Smith</h1>
              <h4>8 Dialogues</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow bg-selectedBg flex flex-col text-white overflow-y-auto">
        <div className="  ">
                 {" "}
          <div className="bg-selectedBg  ml-8 p-4 border-b border-gray-600  ">
                     {" "}
            <button className=" hover:bg-messagesBg text-white p-2 rounded-lg">
              >>
            </button>
                     {" "}
            <button className=" hover:bg-messagesBg text-white p-2 rounded-lg">
              Examble Season
            </button>
                     {" "}
            <button className=" hover:bg-messagesBg text-white p-2 rounded-lg">
              Upload Files
            </button>
                   {" "}
          </div>
          <div>
            <ul className="rightList">
            <li><a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
</svg></a>
</li>
              <li><a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg></a>
</li>
              <li><a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg></a>
</li>
              <li><a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg></a>
</li>
            </ul>
          </div>
        </div>
             {" "}
        <div className="flex-grow p-6 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex items-start space-x-4 ${
                message.user ? "justify-end" : "justify-start"
              }`}
            >
              {message.user ? (
                <div className="flex items-center">
                  <div className="message-content p-4 rounded-lg bg-messagesBg text-white">
                    {message.text}
                  </div>
                  <div className="user-circle flex bg-selectedOrange rounded-full w-8 h-8 ml-4" />
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="bot-circle bg-gray-400 rounded-full w-8 h-8 ml-4 bg-selectedOrange mr-2" />
                  <div className="message-content p-4 rounded-lg bg-messagesBg  text-black ">
                    {message.text}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          
        </div>
        <div className='   w-[50vw] m-auto  flex flex-row justify-center items-center z-[100]  rounded-[20px] bg-messagesBg p-2 '> 
        <input 
  type="text" 
  className="w-[95%] bg-grey text-black border-0 rounded-lg placeholder-text-gray-400 flex items-center "  
  value={input} 
  onChange={(e) => setInput(e.target.value)} 
  placeholder="Type your message..." 
/>

          <button 
            className="p-2 bg-selectedOrange text-white flex justify-center p-2 rounded-full" 
            onClick={handleSend} 
          > 
           <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"> 
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /> 
</svg> 
 
          </button> 
       </div> 
      </div>
    </div>
  );
};

export default Chat;
