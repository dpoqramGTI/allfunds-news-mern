import { Server } from "socket.io";
import { io as Client } from "socket.io-client";

describe("Socket.IO - new-news", () => {
  let ioServer: Server;
  let clientSocket: ReturnType<typeof Client>;

  beforeAll((done) => {
    ioServer = new Server(4000, { cors: { origin: "*" } });

    ioServer.on("connection", (socket) => {
      // Emitimos el evento solo cuando el cliente ya está conectado
      setTimeout(() => {
        socket.emit("new-news", { title: "Mock News" });
      }, 100);
    });

    clientSocket = Client("http://localhost:4000", {
      transports: ["websocket"], // fuerza WebSocket
      upgrade: false
    });

    clientSocket.on("connect", () => {
      done();
    });
  });

  afterAll(() => {
    clientSocket.disconnect();
    ioServer.close();
  });

  it("debe recibir evento new-news", (done) => {
    clientSocket.on("new-news", (data) => {
      expect(data.title).toBe("Mock News");
      done();
    });
  }, 10000); // timeout extendido a 10s
});
