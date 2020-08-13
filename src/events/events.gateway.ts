import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets'

import { Server } from 'socket.io'

@WebSocketGateway()
export default class EventsGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
      return data;
    }
}