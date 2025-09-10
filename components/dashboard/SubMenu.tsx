'use client'

import { Children, isValidElement, ReactNode, useState } from "react"
import { useSidebar } from "@/hooks/use-sidebar"
import { ChevronDownIcon, ChevronRightIcon, UsersIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"
import CustomCollapsible from "./CustomCollapsible"

type SubMenuProps = {
   children: ReactNode
   label: string
}

export default function SubMenu({ label, children }: SubMenuProps) {

   const { isCollapsed } = useSidebar()
   const [isOpen, setIsOpen] = useState(false)
   const [showTooltip, setShowTooltip] = useState(false)
   const pathname = usePathname()

   const hasActiveChild = Children.toArray(children).some((child) => {
      if (isValidElement(child)) {
         const props = child.props as { href?: string }
         if (props.href) {
            return pathname.startsWith(props.href)
         }
      }
      return false
   })

   const isActive = hasActiveChild

   if (isCollapsed) {
      return (
         <div className="relative">
            <button
               className={`w-full flex items-center justify-center p-2 h-12 transition-colors rounded-md cursor-pointer ${isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-slate-200 text-slate-600'}`}
               onMouseEnter={() => setShowTooltip(true)}
               onMouseLeave={() => setShowTooltip(false)}
               tabIndex={0}
            >
               <UsersIcon className="h-5 w-5" />
            </button>
            {showTooltip && (
               <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50 px-2 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap shadow-lg">
                  {label}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-r-[4px] border-transparent border-r-gray-900"></div>
               </div>
            )}
         </div>
      )
   }

   return (
      <CustomCollapsible isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
         <button
            className={`w-full flex items-center justify-between p-3 h-12 transition-colors rounded-md ${isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-slate-200 text-slate-600'}`}
         >
            <div className="flex items-center gap-3">
               <UsersIcon className="h-5 w-5 flex-shrink-0" />
               <span className="font-medium">{label}</span>
            </div>
            {isOpen ? (
               <ChevronDownIcon className="h-4 w-4" />
            ) : (
               <ChevronRightIcon className="h-4 w-4" />
            )}
         </button>
         <div className="space-y-1">
            <div className="ml-4 space-y-1 border-l-2 border-slate-300 pl-4">
               {children}
            </div>
         </div>
      </CustomCollapsible>
   )
}