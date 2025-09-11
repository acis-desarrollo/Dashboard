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
   const [tooltipPosition, setTooltipPosition] = useState({ top: 0 })

   const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setTooltipPosition({ top: rect.top })
      setShowTooltip(true)
   }

   if (isCollapsed) {
      return (
         <div className="relative">
            <Link
               href={link}
               className={`w-full flex items-center justify-center p-2 h-12 transition-colors rounded-md cursor-pointer ${isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-slate-200 text-slate-600'}`}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={() => setShowTooltip(false)}
            >
               {Icon && <Icon className="h-5 w-5" />}
            </Link>
            {showTooltip && (
               <div 
                  className="fixed left-20 z-[9999] bg-slate-800 rounded-lg shadow-2xl border border-slate-700 px-4 py-3"
                  style={{ 
                     top: `${tooltipPosition.top}px` 
                  }}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
               >
                  <span className="font-medium text-white text-sm whitespace-nowrap">{children}</span>
                  <div className="absolute right-full top-4 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-transparent border-r-slate-800"></div>
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