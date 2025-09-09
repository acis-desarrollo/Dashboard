'use client'

import { useSidebar } from "@/hooks/use-sidebar"
import Sidebar from "./Sidebar"
import Header from "./Header"

type DashboardLayoutProps = {
   children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

   const { isCollapsed } = useSidebar()

   return (
      <div className="h-screen flex overflow-hidden">
         <Sidebar />
         <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
            <Header />
            <main className="flex-1 overflow-y-auto">
               <div className="container mx-auto p-4">
                  {children}
               </div>
            </main>
         </div>
      </div>
   )
}