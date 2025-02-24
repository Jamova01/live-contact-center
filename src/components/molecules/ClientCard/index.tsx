import { Avatar } from "@/components/atoms/Avatar";
import { Client } from "@/types/types";

interface ClientCardProps {
  client: Client;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mr-4">
        <Avatar alt={client?.name} />
      </div>

      <div className="flex-1">
        <p className="font-semibold text-gray-800">{client?.name}</p>
        <p className="text-sm text-gray-600">{client?.waitTime} min</p>
      </div>
    </div>
  );
};
