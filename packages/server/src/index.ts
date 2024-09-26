import { Hono } from "hono";
import { logger } from "hono/logger";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

const app = new Hono()
  .use(logger());

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

app.get("/ws", upgradeWebSocket((ctx) => {
  return {
    onMessage(event, ws) {
      console.log(`Message from client: ${event.data}`);
      ws.send('Hello from server!');
    },
    onClose: () => {
      console.log('Connection closed');
    },
  }
}))

export default {
  fetch: app.fetch,
  port: process.env.PORT,
  websocket
}
