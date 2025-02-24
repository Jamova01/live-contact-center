import { Client } from "@/types/types";

export async function getClients(): Promise<Client[]> {
  const response = await fetch("/api/clients");
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}
