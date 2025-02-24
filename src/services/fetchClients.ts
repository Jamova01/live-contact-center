import { Client } from "@/types/types";

export async function getClients(): Promise<Client[]> {
  const response = await fetch("http://localhost:3000/api/clients");
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}
