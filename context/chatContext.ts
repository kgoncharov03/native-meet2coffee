import { createContext } from 'react';

export const ChatContext = createContext({
    chats: [],
    messages: {},
    setMessages: () => {
        return;
    },
    setChats: () => {
        return;
    },
});
