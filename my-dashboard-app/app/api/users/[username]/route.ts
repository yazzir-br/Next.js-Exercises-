import { NextResponse } from 'next/server'

type Params = {
  params: Promise<{ username: string }>
};

export async function GET(_req: Request, { params }: Params) {
  const { username } = await params;
  return NextResponse.json({
    username: username,
    status: "success",
  });
}