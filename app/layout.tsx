import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
   subsets: ['latin'],
   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
   display: 'swap'
})

export const metadata: Metadata = {
   title: "ACIS Especialización",
   description: "ACIS Especialización",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={roboto.className}>
            {children}
         </body>
      </html>
   );
}
