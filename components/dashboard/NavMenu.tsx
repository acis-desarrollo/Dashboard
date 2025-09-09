'use client'

type NavMenuProps = {
   children: React.ReactNode
}

export default function NavMenu({ children }: NavMenuProps) {
   return (
      <nav className="flex-1 overflow-y-auto p-2 bg-slate-50">
         <div className="space-y-1">
            {children}
         </div>
      </nav>
   )
}