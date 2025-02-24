import { Avatar } from "@/components/atoms/Avatar";
import { Agent } from "@/types/types";

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "on call":
        return "bg-red-500";
      case "paused":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mr-4">
        <Avatar alt={agent?.name} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{agent?.name}</p>
        <p className="text-sm text-gray-600">{agent?.status}</p>
      </div>
      <div
        className={`w-3 h-3 rounded-full ${getStatusColor(agent?.status)}`}
        title={agent?.status}
      ></div>
    </div>
  );
};
