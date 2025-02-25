import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) {
    res.status(500).json({ error: "Socket is not available" });
    return;
  }

  const httpServer = (res.socket as any).server;

  if (!httpServer.io) {
    console.log("Initializing Socket.io server...");
    const io = new Server(httpServer, {
      path: "/api/socket",
    });

    httpServer.io = io;

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("updateAgentStatus", (agentId: number, status: string) => {
        console.log(`Agent ${agentId} status updated to ${status}`);
        io.emit("agentStatusUpdated", { agentId, status });
      });

      socket.on(
        "updateClientWaitTime",
        (clientId: number, waitTime: number) => {
          console.log(`Client ${clientId} wait time updated to ${waitTime}`);
          io.emit("clientWaitTimeUpdated", { clientId, waitTime });
        }
      );

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }

  res.end();
}
