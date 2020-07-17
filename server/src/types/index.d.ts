import * as SocketIO from 'socket.io';

declare module 'socket.io' {
    interface Socket {
        username?: String;
        roomnum?: any;
    }
    interface Room {
        host?: any;
        currPlayer?: any;
        currVideo?: any;
        prevVideo?: any;
        hostName?: any;
        users?: any;
        queue?: any;
    }
}
