import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Telvox — AI Voice Infrastructure",
  description:
    "Telvox is AI voice infrastructure for organizations that can't afford to miss a conversation. Connect. Communicate. Scale.",
  icons: {
    icon: "/icons/badge-cta.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f0f0f0] text-[#0a0a0a]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
