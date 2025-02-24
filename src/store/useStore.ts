import { create } from "zustand";
import { Agent, Client } from "@/types/types";
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
  setClients: (clients: Client[]) => void;
  updateAgentStatus: (agentId: number, status: Agent["status"]) => void;
  updateClientWaitTime: (clientId: number, waitTime: number) => void;
  fetchAgents: () => Promise<void>;
  fetchClients: () => Promise<void>;
};

export const useStore = create<StoreState>((set) => ({
  agents: [],
  clients: [],
  isLoadingAgents: false,
  isLoadingClients: false,
  errorAgents: null,
  errorClients: null,
  setAgents: (agents) => set({ agents }),
  setClients: (clients) => set({ clients }),
  updateAgentStatus: (agentId, status) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, status } : agent
      ),
    })),
  updateClientWaitTime: (clientId, waitTime) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, waitTime } : client
      ),
    })),
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
