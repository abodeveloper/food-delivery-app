"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
//import "../lib/i18n";
import Root from "./root";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, ReactQueryDevTools } from "@/lib/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen">
        <QueryClientProvider client={queryClient}>
          <Root>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              <>{children}</>
              <Footer />
            </ThemeProvider>
          </Root>
          <ReactQueryDevTools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
