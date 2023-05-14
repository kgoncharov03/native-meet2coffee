import type { IMessage } from 'react-native-gifted-chat';

export const processMessages = ({ messages, user, self }): IMessage[] => {
    return messages.map(({ ctime, fromId, id, text }) => {
        console.log('!!! text:', text, fromId, user, self);
        return {
            _id: id,
            text,
            createdAt: new Date(ctime),
            user: fromId === user._id ? user : self,
        };
    });
};
