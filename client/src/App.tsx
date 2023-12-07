import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let ws: WebSocket;

  const establishWebsocketConnection = () => {
    try {
      ws = new WebSocket("ws://localhost:8080/echo");
      console.log(ws)
      ws.onopen = () =>  {
        console.log("OPEN");
      };
      ws.onclose = () => {
        console.log("CLOSE");
      };
      ws.onmessage = (res) => {
        console.log(`response recieved ${res.data}`);
      };
    } catch (error) {
      console.log(`Error while Establshing WebSocket Connection: ${error}`);
    }
  };

  const sendHello = () => {
    try {
      if(ws){
        ws.send("Hello");
      }else {
        throw new Error("No WebSocket Connection");
      }
    } catch (error) {
      console.error(`Error while sending hello: ${error}`);
    }
  };

  return (
    <>
      <h1>Socket testing</h1>
      <div className="card">
        <button onClick={establishWebsocketConnection}>
          Establish Socket Connection
        </button>
        <button onClick={sendHello}>Send Hello</button>
      </div>
    </>
  );
}

export default App;
