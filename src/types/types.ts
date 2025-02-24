export type Agent = {
  id: number;
  name: string;
  status: "available" | "on call" | "paused";
  waitTime: number;
};

export type Client = {
  id: number;
  name: string;
  waitTime: number;
};
