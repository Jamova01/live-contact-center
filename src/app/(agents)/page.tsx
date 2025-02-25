"use client";

import { Suspense, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { List } from "@/components/organisms/List";
import { AgentCard } from "@/components/molecules/AgentCard";
import { useStore } from "@/store/useStore";
import { Agent } from "@/types/types";
import { socket } from "@/services/socket";

export default function AgentsPage() {
  const {
    agents,
    isLoadingAgents,
    errorAgents,
    fetchAgents,
    updateAgentStatus,
  } = useStore();

  useEffect(() => {
    if (agents.length === 0) {
      fetchAgents();
    }

    const interval = setInterval(() => {
      if (agents.length === 0) return;

      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const statuses = ["available", "on call", "paused"] as const;
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

      updateAgentStatus(randomAgent.id, newStatus);
      socket.emit("updateAgentStatus", randomAgent.id, newStatus);
    }, 5000);

    return () => clearInterval(interval);
  }, [agents, updateAgentStatus, fetchAgents]);

  if (isLoadingAgents) {
    return <div>Loading agents...</div>;
  }

  if (errorAgents) {
    return <div>{errorAgents}</div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AgentsContent agents={agents} />
    </Suspense>
  );
}

interface AgentsContentProps {
  agents: Agent[];
}

function AgentsContent({ agents }: AgentsContentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const statusFilter = searchParams?.get("status") || "";

  const filteredAgents = useMemo(() => {
    return statusFilter
      ? agents.filter((agent) => agent.status === statusFilter)
      : agents;
  }, [agents, statusFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    const params = new URLSearchParams(searchParams ?? "");
    if (newStatus) {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
