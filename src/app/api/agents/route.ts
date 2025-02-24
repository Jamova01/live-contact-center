import { NextResponse } from "next/server";

const agents = [
  {
    id: 1,
    name: "Carlos López",
    status: "available",
    waitTime: 0,
  },
  {
    id: 2,
    name: "María González",
    status: "on call",
    waitTime: 120,
  },
  {
    id: 3,
    name: "Juan Pérez",
    status: "paused",
    waitTime: 300,
  },
  {
    id: 4,
    name: "Ana Martínez",
    status: "available",
    waitTime: 0,
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    status: "on call",
    waitTime: 180,
  },
];

export async function GET() {
  return NextResponse.json(agents);
}
