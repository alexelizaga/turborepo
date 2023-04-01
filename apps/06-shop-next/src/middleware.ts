import { NextResponse, NextFetchEvent  } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  console.log({ session });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${ requestedPage }`;

    return NextResponse.redirect( url );
  }
}

export const config = {
  matcher: ['/checkout/address', '/checkout/summary'],
}
