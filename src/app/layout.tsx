import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <nav className="nav">
        <Link href={"/products"} className="link">Come Up To All Stuff</Link>
        <Link href={"/create-product"} className="link">Create Product</Link>
      </nav>
      {children}
      </body>
    </html>
  );
}
