import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <DashboardLayout>{children}</DashboardLayout>
}