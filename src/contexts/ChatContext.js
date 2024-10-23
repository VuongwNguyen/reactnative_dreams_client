import {createContext, useContext, useEffect, useState} from 'react';
import {useSocket} from './SocketContext';

const ChatContext = createContext({});

export const ChatProvider = () => {
  const {socket} = useSocket();

  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    return () => {
      setChannel(null);
      setMessages([]);
      socket?.emit('leave-room', channel);
    };
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        socket,
        setChannel,
        setMessages,
        channel,
        messages,
      }}></ChatContext.Provider>
  );
};

export const useChat = channelId => {
  const {channel, messages, setChannel} = useContext(ChatContext);

  setChannel(channelId);

  return {
    channel,
    messages,
  };
};

export default ChatContext;
