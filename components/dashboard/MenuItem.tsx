'use client'

import { useSidebar } from "@/hooks/use-sidebar"
import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

type MenuItemProps = {
   children: React.ReactNode
   icon?: React.ElementType
   link?: Route
}

export default function MenuItem({ icon: Icon, link = '#', children }: MenuItemProps) {

   const { isCollapsed } = useSidebar()
   const pathname = usePathname()
   const isActive = pathname === link

   if (isCollapsed) {
      return (
         <Link
            href={link}
            className={`w-full flex items-center justify-center p-2 h-12 transition-colors rounded-md cursor-pointer ${isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-slate-200 text-slate-600'}`}
         >
            {Icon && <Icon className="h-5 w-5" />}
         </Link>
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