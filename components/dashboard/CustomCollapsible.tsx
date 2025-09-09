'use client'

import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react"

type CollapsibleProps = {
   children: ReactNode
   isOpen: boolean
   onToggle: () => void
}

export default function CustomCollapsible({ children, isOpen, onToggle }: CollapsibleProps) {
   return (
      <div>
         {Children.toArray(children).map((child, index) => {
            if (index === 0 && isValidElement(child)) {
               return cloneElement(child as ReactElement<{ onClick: () => void }>, {
                  onClick: onToggle,
               })
            }
            if (index === 1 && isOpen) {
               return (
                  <div
                     key={index}
                     className="overflow-hidden transition-all duration-200 ease-in-out"
                  >
                     {child}
                  </div>
               )
            }
            return null
         })}
      </div>
   )
}