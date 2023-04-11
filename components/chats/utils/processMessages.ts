import type { IMessage } from 'react-native-gifted-chat';

export const processMessages = ({ messages, user, self }): IMessage[] => {
    return messages.map(({ ctime, fromId, id, text }) => ({
        _id: id,
        text,
        createdAt: new Date(ctime),
        user: fromId === user.id ? user : self,
    }));
};
