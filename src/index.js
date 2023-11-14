import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

// const socket = io.connect(process.env.SOCKET_URL);
const socket = io.connect("https://bc37-115-240-127-98.ngrok-free.app/");
socket.on('message', msg => console.log("heii in xocket"));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <SocketProvider socket={socket}>
    <App />
  </SocketProvider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
