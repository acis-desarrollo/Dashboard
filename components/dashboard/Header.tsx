"use client"

import { useSidebar } from "@/hooks/use-sidebar";
// import { salir } from "@/actions/usuario/salir-usuario-action";
// import { useSidebar } from "@/hooks/use-sidebar";
// import { Usuario } from "@/src/schemas";
import { ArrowRightIcon, Bars3Icon, ChevronDownIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
   usuario: {
      nombre: 'nelson',
      apellido_paterno: 'perez',
      correo: 'demo@comr.com',
      rol: { id: 1, nombre: 'Administrador' }
   }
}

function salir() {
   console.log('Hola, saliendo...')
}

export default function Header({ usuario }: HeaderProps) {

   const router = useRouter()
   const [isPerfilMenu, setIsPerfilMenu] = useState(false)
   const perfilMenuReferencia = useRef<HTMLDivElement>(null)
   const { toggleMobile } = useSidebar()

   useEffect(() => {
      const handleClick = (e: MouseEvent) => {
         if (perfilMenuReferencia.current && !perfilMenuReferencia.current.contains(e.target as Node)) {
            setIsPerfilMenu(false)
         }
      }

      document.addEventListener('mousedown', handleClick)
      return () => {
         document.removeEventListener('mousedown', handleClick)
      }
   }, [])

   const menuPerfil = [
      {
         icono: UserIcon,
         label: 'Mi perfil',
         action: () => {
            router.push('/admin/perfil')
            setIsPerfilMenu(false)
         }
      },
      {
         icono: ArrowRightIcon,
         label: 'Cerrar Sesión',
         action: async () => await salir(),
         isDrager: true
      }
   ]

   return (
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex-shrink-0">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">

               {/* boton Movil */}
               <button
                  type="button"
                  onClick={toggleMobile}
                  className="md:hidden hover:bg-slate-100 text-slate-600"
               >
                  <Bars3Icon className="w-5 h-5" />
               </button>
               <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">Panel de Administración</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
               {/* Aqui va el menu de usuario */}
               <div className="relative" ref={perfilMenuReferencia}>
                  <button
                     onClick={() => setIsPerfilMenu(!isPerfilMenu)}
                     className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                     <div className="flex items-center justify-center">
                        <UserCircleIcon className="w-8 h-8 text-blue-800 " />
                     </div>
                     <div className="hidden sm:block text-left">
                        <p className="text-sm text-slate-700 font-bold">{`Nelson`}</p>
                        <p className="text-xs text-slate-500 ">Master</p>
                     </div>
                     <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isPerfilMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {isPerfilMenu && (
                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in duration-200">
                        {/* Información */}
                        <div className="px-4 py-3 border-b border-gray-100">
                           <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center">
                                 <UserCircleIcon className="w-8 h-8 text-blue-800 " />
                              </div>
                              <div>
                                 <p className="text-sm font-semibold text-gray-900">{`nelson Huaman`}</p>
                                 <p className="text-xs text-gray-500">correo.com</p>
                              </div>
                           </div>
                        </div>

                        {/* Menus */}
                        <div className="p-4 flex flex-col gap-2">
                           {menuPerfil.map((item, index) => {
                              const Icon = item.icono
                              return (
                                 <button
                                    key={index}
                                    type="button"
                                    onClick={item.action}
                                    className={`w-full flex items-center gap-2 p-2   text-sm transition-colors ${item.isDrager ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100'}`}
                                 >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium">{item.label}</span>
                                 </button>
                              )
                           })}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   )
}
