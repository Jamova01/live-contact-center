"use client";

import { Suspense, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { List } from "@/components/organisms/List";
import { ClientCard } from "@/components/molecules/ClientCard";
import { useStore } from "@/store/useStore";
import { Client } from "@/types/types";
import { socket } from "@/services/socket";

export default function ClientsPage() {
  const { clients, isLoadingClients, errorClients, fetchClients, setClients } =
    useStore();

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }

    const interval = setInterval(() => {
      const action = Math.random() > 0.5 ? "add" : "remove";
      setClients((prevClients) => {
        let updatedClients;
        if (action === "add") {
          const newClient = {
            id: Date.now(),
            name: `Cliente ${Date.now()}`,
            waitTime: Math.floor(Math.random() * 10) + 1,
          };
          updatedClients = [...prevClients, newClient];
          socket.emit("addClient", newClient);
        } else if (prevClients.length > 0) {
          updatedClients = prevClients.slice(1);
          socket.emit("removeClient", prevClients[0].id);
        } else {
          return prevClients;
        }
        return updatedClients;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [clients, fetchClients]);

  if (isLoadingClients) {
    return <div>Loading clients...</div>;
  }

  if (errorClients) {
    return <div>{errorClients}</div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ClientsContent clients={clients} />
    </Suspense>
  );
}

interface ClientsContentProps {
  clients: Client[];
}

function ClientsContent({ clients }: ClientsContentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const waitTimeFilter = searchParams?.get("waitTime") || "";

  const filteredClients = useMemo(() => {
    return waitTimeFilter
      ? clients.filter(
          (client) => client.waitTime >= parseInt(waitTimeFilter, 10)
        )
      : clients;
  }, [clients, waitTimeFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newWaitTime = event.target.value;
    const params = new URLSearchParams(searchParams ?? "");
    if (newWaitTime) {
      params.set("waitTime", newWaitTime);
    } else {
      params.delete("waitTime");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Clients Dashboard</h2>
      <div className="mb-4">
        <label htmlFor="waitTime-filter" className="mr-2">
          Filter by wait time:
        </label>
        <select
          id="waitTime-filter"
          value={waitTimeFilter}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="5">5+ min</option>
          <option value="10">10+ min</option>
          <option value="15">15+ min</option>
        </select>
      </div>
      <List
        items={filteredClients}
        renderItem={(client) => <ClientCard client={client} />}
      />
    </div>
  );
}
