import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAuthenticated } from './lib/auth'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/session')) {
        if (!isAuthenticated(request)) {
            return NextResponse.redirect(new URL('/login', request.url))
        }    
    } else {
        if (pathname == "/") {
            return NextResponse.redirect(new URL('/login', request.url))
        } else if (pathname == "/login") {
            if (isAuthenticated(request)) {
                return NextResponse.redirect(new URL('/dashboard', request.url))     
            }    
        } else {
            // if (pathname.startsWith("/session")){
            //     if (!isAuthenticated(request)) {
            //         return NextResponse.redirect(new URL('/login'))
            //     }
            // }
            // return NextResponse.redirect(request.url)
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}