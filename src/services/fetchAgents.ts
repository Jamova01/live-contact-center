import { Agent } from "@/types/types";

export async function getAgents(): Promise<Agent[]> {
  const response = await fetch("/api/agents");
  if (!response.ok) throw new Error("Failed to fetch agents");
  return response.json();
}
