import ChatHistory from "./components/ChatHistory";
import ChatBox from "./components/ChatBox";
import ToggleButton from "./components/ToggleButton";
import "./App.css";
import { useState } from "react";
import ChatLog from "./components/ChatLog";
import React, { useEffect } from "react";


function App() {
  const [history, setHistory] = useState(["la", "li", "lu", "le", "lo"]);
  const [chatlog, setLog] = useState([]);
  const [toggle, setToggle] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/chat");
      const data = await response.json();
      console.log(data);
    }
  
    fetchData();
  }, []);

  const handleSelectChat = (item: string) => {
    console.log(item);
  };

  const handleNewChat = () => {
    const newHistory = ["New Chat", ...history];
    setHistory(newHistory);
  };

  const handleSentChat = (chat: string) => {
    const newLog = [...chatlog, chat, "Maaf fitur ngejawabnya belom jadi"];
    // setLog(newLog);
    console.log(chat);
  };

  const handleToggle = (toggle: string) => {
    setToggle(toggle);
    console.log(toggle);
  };

  return (
    <div id="app-root" className="mb-1 text-white vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        <div
          className="p-3 col-3 align-self-start chat-history-container"
          style={{ marginLeft: "5px" }}
        >
          <h1 style={{ marginBottom: "0.5rem" }}>ChitChat</h1>
          <button
            type="button"
            className="newchatbutton w-100"
            onClick={handleNewChat}
            style={{
              marginBottom: "0.5rem",
              marginTop: "0.5rem",
              marginLeft: "2px",
            }}
          >
            + New Chat
          </button>
          <h2
            style={{ marginBottom: "1rem", marginTop: "0.5rem", height: "3%" }}
          >
            Chat History
          </h2>
          <div className="chat-history-list">
            <ChatHistory history={history} onSelectItem={handleSelectChat} />
          </div>
          <div
            className="position-absolute bottom-0"
            style={{ marginBottom: "5px", width: "20%", marginLeft: "2%" }}
          >
            <ToggleButton onToggle={handleToggle} />
          </div>
        </div>
        <div id="chatbox" className="col vh-100 position-relative">
          <div className="row chatlog-container">
            <ChatLog log={chatlog} />
          </div>
          <div
            className="position-absolute bottom-0 w-100 chatbox-container"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <ChatBox onSend={handleSentChat} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;








