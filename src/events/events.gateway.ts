import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'

import { Server } from 'socket.io'

@WebSocketGateway()
export default class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private wsClients = []

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: any): Promise<number> {
    return data
  }

  public handleConnection(client: any, ...args: any[]) {
    this.wsClients.push(client)
  }

  public handleDisconnect(client: any) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1)
        break
      }
    }
  }

  private broadcast(event, broadCastMessage: any, userId: string) {
    this.wsClients.filter(socket => {
      return socket.handshake.query.userId == userId
    }).forEach(socket => {
      socket.emit(event, broadCastMessage)
    })
  }
}