'use client'

import { create } from "zustand"
import { persist } from "zustand/middleware"

type SidebarState = {
   isCollapsed: boolean
   isMobileOpen: boolean
   toggleCollapse: () => void
   toggleMobile: () => void
   setMobileOpen: (open: boolean) => void
}

export const useSidebar = create<SidebarState>()(
   persist(
      (set, get) => ({
         isCollapsed: false,
         isMobileOpen: false,
         toggleCollapse: () => {
            if (typeof window !== 'undefined' && window.innerWidth >= 768) {
               set((state) => ({ isCollapsed: !state.isCollapsed }))
            }
         },
         toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
        setMobileOpen: (open: boolean) => set({ isMobileOpen: open })
      }),
      {
         name: "sidebar-storage",
         partialize: (state) => ({ isCollapsed: state.isCollapsed })
      }
   )
)