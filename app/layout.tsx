import type { Metadata } from "next";
import { CartProvider } from "@/context/cart";
import { ContextProvider } from "@/context";
import "./globals.css";
import { findCartItemsByUser, getCurrentUser } from "@/lib/data";


export const metadata: Metadata = {
  title: "ModeRegal ",
  description: "Boutique de vêtements en ligne pour hommes et femmes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()
  const userId = user ? user.id : null;
  const items = await findCartItemsByUser(userId as string)

  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body
      >
        <ContextProvider initialCurrentUser={user as null}>
          <CartProvider userId={userId as string} initialItems={items}>

            {children}

          </CartProvider>
        </ContextProvider>

      </body>
    </html>
  );
}
