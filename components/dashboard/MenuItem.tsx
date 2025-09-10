'use client'

import { useSidebar } from "@/hooks/use-sidebar"
import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type MenuItemProps = {
   children: React.ReactNode
   icon?: React.ElementType
   link?: Route
}

export default function MenuItem({ icon: Icon, link = '#', children }: MenuItemProps) {

   const { isCollapsed } = useSidebar()
   const pathname = usePathname()
   const isActive = pathname === link
   const [showTooltip, setShowTooltip] = useState(false)

   if (isCollapsed) {
      return (
         <div className="relative">
            <Link
               href={link}
               className={`w-full flex items-center justify-center p-2 h-12 transition-colors rounded-md cursor-pointer ${isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-slate-200 text-slate-600'}`}
               onMouseEnter={() => setShowTooltip(true)}
               onMouseLeave={() => setShowTooltip(false)}
            >
               {Icon && <Icon className="h-5 w-5" />}
            </Link>
            {showTooltip && (
              <div className="fixed left-20 top-1/2 transform -translate-y-1/2 z-[9999] px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
                  {children}
                 <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900"></div>
               </div>
            )}
         </div>
      )
   }

   return (
      <Link
         href={link}
         className={`w-full flex items-center gap-3 p-3 h-12 transition-colors rounded-md cursor-pointer ${isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-slate-200 text-slate-600'}`}
      >
         {Icon && <Icon className="h-5 w-5" />}
         <span className="font-medium">{children}</span>
      </Link>
   )
}