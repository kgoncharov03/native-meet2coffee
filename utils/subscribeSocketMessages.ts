import { Socket } from 'socket.io-client';
import { eventEmitter } from '../event';
import { Event } from '../event/typings';

export const subscribeSocketMessages = (socket: Socket) => {
    socket.on('NEW_MESSAGE', (data) => {
        console.log('@@@', data);
        eventEmitter.emit(Event.NEW_MESSAGE, data);
    });
};
