// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// import { headers } from 'next/headers'
// import { auth } from './lib/auth';

// export async function proxy(request: NextRequest) {
//   const session = await auth.api.getSession({
//     headers: await headers()
//   });

//   const user = session?.user;
//   if(!user){
//     return NextResponse.redirect(new URL('/sign-in', request.url))
//   }

// }


// export const config = {
//   matcher: ['/dashboard', '/dashboard/admin', '/dashboard/admin/:path*', '/dashboard/vendor', '/dashboard/vendor/:path*' , '/dashboard/customer'],
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export const runtime = "nodejs";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (path.startsWith("/dashboard/vendor") && user.role !== "vendor") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (path.startsWith("/dashboard/customer") && user.role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/admin/:path*',
    '/dashboard/vendor/:path*',
    '/dashboard/customer/:path*',
  ],
}