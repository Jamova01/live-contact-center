import { create } from "zustand";
import { Agent, Client } from "@/types/types";
import { socket } from "@/services/socket";
import { getAgents } from "@/services/fetchAgents";
import { getClients } from "@/services/fetchClients";

type StoreState = {
  agents: Agent[];
  clients: Client[];
  isLoadingAgents: boolean;
  isLoadingClients: boolean;
  errorAgents: string | null;
  errorClients: string | null;
  setAgents: (agents: Agent[]) => void;
  setClients: (
    clients: Client[] | ((prevClients: Client[]) => Client[])
  ) => void;
  updateAgentStatus: (agentId: number, status: Agent["status"]) => void;
  updateClientWaitTime: (clientId: number, waitTime: number) => void;
  fetchAgents: () => Promise<void>;
  fetchClients: () => Promise<void>;
};

export const useStore = create<StoreState>((set, get) => ({
  agents: [],
  clients: [],
  isLoadingAgents: false,
  isLoadingClients: false,
  errorAgents: null,
  errorClients: null,
  setAgents: (agents) => set({ agents }),
  setClients: (clients) =>
    set((state) => ({
      clients: typeof clients === "function" ? clients(state.clients) : clients,
    })),
  updateAgentStatus: (agentId, status) => {
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, status } : agent
      ),
    }));
    socket.emit("updateAgentStatus", agentId, status);
  },
  updateClientWaitTime: (clientId, waitTime) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, waitTime } : client
      ),
    }));
    socket.emit("updateClientWaitTime", clientId, waitTime);
  },
  fetchAgents: async () => {
    set({ isLoadingAgents: true, errorAgents: null });
    try {
      const agents = await getAgents();
      set({ agents, isLoadingAgents: false });
    } catch (error) {
      console.error("Error fetching agents:", error);
      set({ errorAgents: "Failed to load agents", isLoadingAgents: false });
    }
  },
  fetchClients: async () => {
    set({ isLoadingClients: true, errorClients: null });
    try {
      const clients = await getClients();
      set({ clients, isLoadingClients: false });
    } catch (error) {
      console.error("Error fetching clients:", error);
      set({ errorClients: "Failed to load clients", isLoadingClients: false });
    }
  },
}));

socket.on("agentStatusUpdated", ({ agentId, status }) => {
  const { agents, setAgents } = useStore.getState();
  const updatedAgents = agents.map((agent) =>
    agent.id === agentId ? { ...agent, status } : agent
  );
  setAgents(updatedAgents);
});

socket.on("clientWaitTimeUpdated", ({ clientId, waitTime }) => {
  const { clients, setClients } = useStore.getState();
  const updatedClients = clients.map((client) =>
    client.id === clientId ? { ...client, waitTime } : client
  );
  setClients(updatedClients);
});
