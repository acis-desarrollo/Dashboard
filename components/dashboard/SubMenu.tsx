'use client'

import { Children, isValidElement, ReactNode, useState } from "react"
import Link from "next/link"
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
   const [tooltipPosition, setTooltipPosition] = useState({ top: 0 })
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

   const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setTooltipPosition({ top: rect.top })
      setShowTooltip(true)
   }
   if (isCollapsed) {
      return (
         <div className="relative">
            <button
               className={`w-full flex items-center justify-center p-2 h-12 transition-colors rounded-md cursor-pointer ${isActive ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-slate-200 text-slate-600'}`}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={() => setShowTooltip(false)}
            >
               <UsersIcon className="h-5 w-5" />
            </button>
            {showTooltip && (
               <div 
                  className="fixed left-20 z-[9999] bg-slate-800 rounded-lg shadow-2xl min-w-52 border border-slate-700"
                  style={{ 
                     top: `${tooltipPosition.top}px` 
                  }}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
               >
                  {/* Título del SubMenu */}
                  <div className="px-4 py-3 bg-slate-700 rounded-t-lg border-b border-slate-600">
                     <span className="font-semibold text-white text-sm">{label}</span>
                  </div>
                  
                  {/* Lista de elementos navegables */}
                  <div className="py-2">
                     {Children.map(children, (child) => {
                        if (isValidElement(child)) {
                           const childProps = child.props as { 
                              link?: string, 
                              children?: ReactNode,
                              icon?: React.ElementType 
                           }
                           const Icon = childProps.icon
                           
                           return (
                              <Link
                                 key={childProps.link}
                                 href={childProps.link || '#'}
                                 className="flex items-center gap-3 px-4 py-2.5 text-gray-200 hover:bg-slate-700 hover:text-white transition-colors text-sm"
                                 onClick={() => setShowTooltip(false)}
                              >
                                 {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                                 <span>{childProps.children}</span>
                              </Link>
                           )
                        }
                        return null
                     })}
                  </div>
                  
                  {/* Flecha indicadora */}
                  <div className="absolute right-full top-4 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-transparent border-r-slate-800"></div>
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