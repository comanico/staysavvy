import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Allow unauthenticated access to the home page, hotel-details, and uploadthing API
    '/',
    '/hotel-details/:id',
    '/api/uploadthing',
    '/privacy-policy',
    // Always run for other API routes
    '/(api|trpc)(.*)',
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};