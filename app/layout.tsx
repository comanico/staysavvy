import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/toaster";
import LocationFilter from "@/components/LocationFilter";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "StaySavvy",
  description: "Book your next vacation with StaySavvy",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
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
              <Suspense>
                <LocationFilter />
              </Suspense>
              <section className="flex-grow">
                <Container>{children}</Container>
              </section>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
