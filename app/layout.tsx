import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/toaster";
import LocationFilter from "@/components/LocationFilter";
import { Suspense } from "react";
import CookieConsentWrapper from "@/components/CookieConsentWrapper";

export const metadata: Metadata = {
  title: "Neva Apartments | Book your next vacation",
  description: "Book your next vacation with Neva Aprtments",
  icons: { icon: "/logo.svg" },
};

console.log("CLERK_SECRET_KEY at runtime:", process.env.CLERK_SECRET_KEY);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <main className="flx flex-col min-h-screen bg-secondary">
              <NavBar />
              <Suspense fallback={<div>Loading...</div>}>
                <LocationFilter />
              </Suspense>
              <section className="flex-grow">
                <Container>{children}</Container>
              </section>
            </main>
          </ThemeProvider>
          <CookieConsentWrapper />
        </body>
      </html>
    </ClerkProvider>
  );
}
