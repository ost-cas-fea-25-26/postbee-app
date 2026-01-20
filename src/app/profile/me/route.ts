import { getSession } from '@/lib/auth/auth';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session?.user?.identifier) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.redirect(new URL(`/profile/${session.user.identifier}/mumbles`, req.url));
}
