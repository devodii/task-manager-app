import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  namespace: 'task',
  cors: {
    origin: ['http://localhost:3000', 'https://task-manager-v1.vercel.app/'],
  },
})
export class TaskGateway {
  @WebSocketServer()
  @SubscribeMessage('hello')
  sayHello(@MessageBody('name') name: string) {
    console.log({ name });

    return { message: 'Hello' + name };
  }
}
