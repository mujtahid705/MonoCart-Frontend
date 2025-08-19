import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReduxProvider } from "@/redux/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monocart - Premium Shopping Destination",
  description:
    "Discover the latest trends in fashion with our exclusive Monocart collection designed for the modern lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster
            position="bottom-right"
            expand={true}
            richColors={true}
            closeButton={true}
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#1f2937",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
                padding: "16px",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backdropFilter: "blur(8px)",
              },
              className: "monocart-toast",
              duration: 4000,
            }}
            theme="light"
            offset={20}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
