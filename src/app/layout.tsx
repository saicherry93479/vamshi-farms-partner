import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vamshi Farms Partner Panel",
  description: "Partner dashboard for Vamshi Farms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} min-h-screen bg-[#fafafa] text-gray-800 antialiased`}
      >
        <div className="min-h-screen flex">{children}</div>
      </body>
    </html>
  );
}
