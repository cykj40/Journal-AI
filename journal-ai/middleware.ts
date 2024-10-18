import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, request) => {
    if (!isPublicRoute(request)) {
        // If the user is not authenticated, handle without redirecting to sign-in
        if (!auth().userId) {
            return NextResponse.json({ message: 'You must be signed in to access this route.' }, { status: 401 });
        }
    }
    // Proceed to the next handler
    return NextResponse.next();

});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};




