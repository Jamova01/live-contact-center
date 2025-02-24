"use client";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { List } from "@/components/organisms/List";
import { ClientCard } from "@/components/molecules/ClientCard";
import { useStore } from "@/store/useStore";

export default function ClientsPage() {
  const { clients, isLoadingClients, errorClients, fetchClients } = useStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const waitTimeFilter = searchParams.get("waitTime") || "";

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }
  }, [clients, fetchClients]);

  const filteredClients = useMemo(() => {
    return waitTimeFilter
      ? clients.filter(
          (client) => client.waitTime >= parseInt(waitTimeFilter, 10)
        )
      : clients;
  }, [clients, waitTimeFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newWaitTime = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (newWaitTime) {
      params.set("waitTime", newWaitTime);
    } else {
      params.delete("waitTime");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (isLoadingClients) {
    return <div>Loading clients...</div>;
  }

  if (errorClients) {
    return <div>{errorClients}</div>;
  }

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
