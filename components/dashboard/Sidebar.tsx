'use client'

import { useSidebar } from "@/hooks/use-sidebar"
import { Bars3Icon, ChatBubbleBottomCenterTextIcon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline"
import NavMenu from "./NavMenu"
import MenuItem from "./MenuItem"
import SubMenu from "./SubMenu"
import Logo from "../ui/Logo"


export default function Sidebar() {

   const { isCollapsed, isMobileOpen, toggleCollapse, setMobileOpen } = useSidebar()

   return (
      <>
         {isMobileOpen && (
            <div
               className="fixed inset-0 bg-black/50 z-40 md:hidden"
               onClick={() => setMobileOpen(false)}
            />
         )}

         <aside className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-300 shadow-2xl transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex flex-col h-full">
               <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-100">
                  {!isCollapsed && (
                     <div className="flex items-center gap-3">
                        <div className="w-20">
                           <Logo />
                        </div>
                        <span className="font-bold text-lg text-slate-800">Sistema</span>
                     </div>
                  )}

                  <button
                     onClick={toggleCollapse}
                     className="hidden md:flex items-center justify-center w-10 h-10 hover:bg-slate-200 text-slate-600 rounded-md transition-colors"
                  >
                     <Bars3Icon className="h-5 w-5" />
                  </button>

                  <button
                     onClick={() => setMobileOpen(false)}
                     className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-slate-200 text-slate-600 rounded-md transition-colors"
                  >
                     <XMarkIcon className="h-5 w-5" />
                  </button>
               </div>

               <NavMenu>
                  <MenuItem icon={HomeIcon} link='/dashboard'>Escritorio</MenuItem>
                  <SubMenu label="Usuarios">
                     <MenuItem icon={UsersIcon} link='/usuarios'>Todos los usuarios</MenuItem>
                  </SubMenu>
                  <SubMenu label="Clientes">
                     <MenuItem icon={UsersIcon} link='/clientes'>Todos los clientes</MenuItem>
                     <MenuItem icon={UsersIcon} link='/clientes/crear'>Crear cliente</MenuItem>
                  </SubMenu>
                  <MenuItem icon={ChatBubbleBottomCenterTextIcon} link='/tickets'>Tickets</MenuItem>
               </NavMenu>
            </div>
         </aside>
      </>
   )
}