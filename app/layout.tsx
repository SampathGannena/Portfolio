import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sampath Gannena | Senior Full-Stack Developer",
  description: "The executive portfolio of Sampath Gannena, a senior full-stack developer and technology leader.",
  keywords: ["portfolio", "developer", "interactive", "web development", "full stack"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Sampath Gannena | Senior Full-Stack Developer",
    description: "Building digital products that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
