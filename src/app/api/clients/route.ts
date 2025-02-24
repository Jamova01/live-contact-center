import { NextResponse } from "next/server";

const clients = [
  {
    id: 1,
    name: "Cliente A",
    waitTime: 3,
  },
  {
    id: 2,
    name: "Cliente B",
    waitTime: 8,
  },
  {
    id: 3,
    name: "Cliente C",
    waitTime: 15,
  },
];

export async function GET() {
  return NextResponse.json(clients);
}
