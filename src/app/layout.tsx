import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanya Nikah - Menuntunmu menuju akad yang berkah",
  description:
    "TanyaNikah adalah chatbot interaktif yang siap membimbingmu dengan informasi akurat dan terpercaya seputar pernikahan dalam Islam. Dari rukun dan syarat sah nikah hingga tata cara akad yang benar, semua tersedia dalam satu tempat. Dengan TanyaNikah, kamu bisa mendapatkan jawaban yang jelas dan sesuai syariat, kapan saja dan di mana saja. Menuntunmu menuju akad yang berkah!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
