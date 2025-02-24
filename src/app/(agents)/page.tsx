"use client";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { List } from "@/components/organisms/List";
import { AgentCard } from "@/components/molecules/AgentCard";
import { useStore } from "@/store/useStore";

export default function AgentsPage() {
  const {
    agents,
    isLoadingAgents,
    errorAgents,
    fetchAgents,
  } = useStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const statusFilter = searchParams.get("status") || "";

  useEffect(() => {
    if (agents.length === 0) {
      fetchAgents();
    }
  }, [agents, fetchAgents]);

  const filteredAgents = useMemo(() => {
    return statusFilter
      ? agents.filter((agent) => agent.status === statusFilter)
      : agents;
  }, [agents, statusFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (newStatus) {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoadingAgents) {
    return <div>Loading agents...</div>;
  }

  if (errorAgents) {
    return <div>{errorAgents}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Agents Dashboard</h2>
      <div className="mb-4">
        <label htmlFor="status-filter" className="mr-2">
          Filter by status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="on call">On Call</option>
          <option value="paused">Paused</option>
        </select>
      </div>
      <List
        items={filteredAgents}
        renderItem={(agent) => <AgentCard agent={agent} />}
      />
    </div>
  );
}
