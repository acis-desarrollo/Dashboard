'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Cliente = {
   id: number
   tipo_documento: string
   numero_documento: string
   nombre: string
   apellido_paterno: string
   apellido_materno: string
   correo: string
   grado_academico: string
   pais: {
      nombre: string
      codigo_iso: string
   }
   profesion: any
   telefonos: Array<{
      id: number
      numero: string
      tipo: string
      pais: {
         codigo_iso: string
         codigo_telefono: string
      }
   }>
}

type ClientesResponse = {
   clientes: Cliente[]
   meta: {
      total: number
      pagina: number
      limite: number
      paginas: number
   }
}

export default function ClientesPage() {
   const [clientes, setClientes] = useState<Cliente[]>([])
   const [meta, setMeta] = useState({
      total: 0,
      pagina: 1,
      limite: 10,
      paginas: 0
   })
   const [loading, setLoading] = useState(true)
   const [searchTerm, setSearchTerm] = useState('')
   const [searchType, setSearchType] = useState<'numero_documento' | 'correo'>('numero_documento')

   // Datos de ejemplo basados en tu estructura
   const clientesEjemplo: ClientesResponse = {
      clientes: [
         {
            id: 17,
            tipo_documento: "DNI",
            numero_documento: "12345678",
            nombre: "Nelson",
            apellido_paterno: "Huaman",
            apellido_materno: "Perez",
            correo: "nelson@correo.com",
            grado_academico: "Ingeniero",
            pais: {
               nombre: "Perú",
               codigo_iso: "PE"
            },
            profesion: null,
            telefonos: [
               {
                  id: 9,
                  numero: "987654321",
                  tipo: "WHATSAPP",
                  pais: {
                     codigo_iso: "PE",
                     codigo_telefono: "+51"
                  }
               }
            ]
         },
         {
            id: 18,
            tipo_documento: "DNI",
            numero_documento: "87654321",
            nombre: "María",
            apellido_paterno: "García",
            apellido_materno: "López",
            correo: "maria@correo.com",
            grado_academico: "Licenciada",
            pais: {
               nombre: "Perú",
               codigo_iso: "PE"
            },
            profesion: null,
            telefonos: [
               {
                  id: 10,
                  numero: "912345678",
                  tipo: "MOVIL",
                  pais: {
                     codigo_iso: "PE",
                     codigo_telefono: "+51"
                  }
               }
            ]
         },
         {
            id: 19,
            tipo_documento: "PASAPORTE",
            numero_documento: "A1234567",
            nombre: "Carlos",
            apellido_paterno: "Rodríguez",
            apellido_materno: "",
            correo: "carlos@correo.com",
            grado_academico: "Magíster",
            pais: {
               nombre: "Colombia",
               codigo_iso: "CO"
            },
            profesion: null,
            telefonos: [
               {
                  id: 11,
                  numero: "3001234567",
                  tipo: "WHATSAPP",
                  pais: {
                     codigo_iso: "CO",
                     codigo_telefono: "+57"
                  }
               }
            ]
         }
      ],
      meta: {
         total: 3,
         pagina: 1,
         limite: 10,
         paginas: 1
      }
   }

   useEffect(() => {
      // Simular carga de datos
      setTimeout(() => {
         setClientes(clientesEjemplo.clientes)
         setMeta(clientesEjemplo.meta)
         setLoading(false)
      }, 1000)
   }, [])

   const filteredClientes = clientes.filter(cliente => {
      if (!searchTerm) return true
      
      const searchValue = searchTerm.toLowerCase()
      if (searchType === 'numero_documento') {
         return cliente.numero_documento.toLowerCase().includes(searchValue)
      } else {
         return cliente.correo.toLowerCase().includes(searchValue)
      }
   })

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      // Aquí iría la lógica para buscar en el servidor
      console.log('Buscando:', searchType, searchTerm)
   }

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
         </div>
      )
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
               <p className="text-gray-600">Gestiona todos los clientes del sistema</p>
            </div>
            <Link
               href="/admin/clientes/crear"
               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
               <PlusIcon className="w-5 h-5" />
               Nuevo Cliente
            </Link>
         </div>

         {/* Barra de búsqueda */}
         <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
               <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Buscar cliente
                  </label>
                  <div className="relative">
                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Buscar por ${searchType === 'numero_documento' ? 'número de documento' : 'correo electrónico'}`}
                     />
                  </div>
               </div>
               <div className="sm:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Buscar por
                  </label>
                  <select
                     value={searchType}
                     onChange={(e) => setSearchType(e.target.value as 'numero_documento' | 'correo')}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                     <option value="numero_documento">Número de Documento</option>
                     <option value="correo">Correo Electrónico</option>
                  </select>
               </div>
               <div className="flex items-end">
                  <button
                     type="submit"
                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                  >
                     Buscar
                  </button>
               </div>
            </form>
         </div>

         {/* Información de resultados */}
         <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
               Mostrando {filteredClientes.length} de {meta.total} clientes
            </span>
            <span>
               Página {meta.pagina} de {meta.paginas}
            </span>
         </div>

         {/* Lista de clientes */}
         <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            {filteredClientes.length === 0 ? (
               <div className="p-8 text-center">
                  <p className="text-gray-500">No se encontraron clientes</p>
               </div>
            ) : (
               <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Documento
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Correo
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              País
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Teléfono
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {filteredClientes.map((cliente) => (
                           <tr key={cliente.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div>
                                    <div className="text-sm font-medium text-gray-900">
                                       {cliente.nombre} {cliente.apellido_paterno} {cliente.apellido_materno}
                                    </div>
                                    {cliente.grado_academico && (
                                       <div className="text-sm text-gray-500">
                                          {cliente.grado_academico}
                                       </div>
                                    )}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="text-sm text-gray-900">
                                    {cliente.tipo_documento}: {cliente.numero_documento}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="text-sm text-gray-900">
                                    {cliente.correo}
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center">
                                    <span className="text-sm text-gray-900">
                                       {cliente.pais.nombre}
                                    </span>
                                    <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                       {cliente.pais.codigo_iso}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {cliente.telefonos.length > 0 && (
                                    <div className="text-sm text-gray-900">
                                       <div>
                                          {cliente.telefonos[0].pais.codigo_telefono} {cliente.telefonos[0].numero}
                                       </div>
                                       <div className="text-xs text-gray-500">
                                          {cliente.telefonos[0].tipo}
                                          {cliente.telefonos.length > 1 && ` (+${cliente.telefonos.length - 1} más)`}
                                       </div>
                                    </div>
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 <div className="flex items-center space-x-2">
                                    <Link
                                       href={`/admin/clientes/${cliente.id}`}
                                       className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                       title="Ver detalles"
                                    >
                                       <EyeIcon className="w-4 h-4" />
                                    </Link>
                                    <Link
                                       href={`/admin/clientes/${cliente.id}/editar`}
                                       className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                       title="Editar"
                                    >
                                       <PencilIcon className="w-4 h-4" />
                                    </Link>
                                    <button
                                       className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                       title="Eliminar"
                                       onClick={() => console.log('Eliminar cliente', cliente.id)}
                                    >
                                       <TrashIcon className="w-4 h-4" />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>

         {/* Paginación */}
         {meta.paginas > 1 && (
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  <button
                     disabled={meta.pagina === 1}
                     className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     Anterior
                  </button>
                  <span className="px-3 py-2 text-sm text-gray-700">
                     Página {meta.pagina} de {meta.paginas}
                  </span>
                  <button
                     disabled={meta.pagina === meta.paginas}
                     className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     Siguiente
                  </button>
               </div>
               <div className="text-sm text-gray-600">
                  Total: {meta.total} clientes
               </div>
            </div>
         )}
      </div>
   )
}