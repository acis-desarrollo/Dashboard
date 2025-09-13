import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
   subsets: ['latin'],
   weight: ['100', '300', '400', '500', '700', '900'],
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
           <DashboardLayout>{children}</DashboardLayout>
         </body>
      </html>
   );
}
