import { NextResponse, NextFetchEvent  } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies.get('token')?.value || '';
  
  try {
    // await jwt.isValidToken( token );
    // [Error: The edge runtime does not support Node.js 'crypto' module. Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime]

    if (!token) throw new Error();

    return NextResponse.next();
  } catch (error) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${req.nextUrl.pathname}`
    return NextResponse.redirect(url)
  }

}

export const config = {
  matcher: '/checkout/:path*',
}
