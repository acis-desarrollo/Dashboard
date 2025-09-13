'use client'

import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

type Telefono = {
   pais_id: number
   numero: string
   tipo: 'WHATSAPP' | 'MOVIL' | 'FIJO'
}

export default function CrearClientePage() {
   const [formData, setFormData] = useState({
      pais_id: 17,
      tipo_documento: 'DNI',
      numero_documento: '',
      nombre_usuario: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      fecha_nacimiento: '',
      correo: '',
      discapacidad: 'false',
      grado_academico: '',
      profesion_id: '',
      colegiatura: '',
   })

   const [telefonos, setTelefonos] = useState<Telefono[]>([
      { pais_id: 17, numero: '', tipo: 'WHATSAPP' }
   ])

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const handleTelefonoChange = (index: number, field: keyof Telefono, value: string | number) => {
      setTelefonos(prev => prev.map((tel, i) => 
         i === index ? { ...tel, [field]: value } : tel
      ))
   }

   const agregarTelefono = () => {
      setTelefonos(prev => [...prev, { pais_id: 17, numero: '', tipo: 'WHATSAPP' }])
   }

   const eliminarTelefono = (index: number) => {
      if (telefonos.length > 1) {
         setTelefonos(prev => prev.filter((_, i) => i !== index))
      }
   }

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const clienteData = {
         ...formData,
         telefonos
      }
      console.log('Datos del cliente:', clienteData)
      // Aquí iría la lógica para enviar los datos
   }

   return (
      <div className="max-w-4xl mx-auto space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Cliente</h1>
               <p className="text-gray-600">Completa la información del cliente</p>
            </div>
            <a
               href="/clientes"
               className="text-gray-600 hover:text-gray-800 font-medium"
            >
               ← Volver a clientes
            </a>
         </div>

         <form onSubmit={handleSubmit} className="space-y-8">
            {/* Información Personal */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
               <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        País
                     </label>
                     <select
                        name="pais_id"
                        value={formData.pais_id}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     >
                        <option value={17}>Perú</option>
                        <option value={1}>Argentina</option>
                        <option value={2}>Colombia</option>
                        <option value={3}>México</option>
                     </select>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Documento
                     </label>
                     <select
                        name="tipo_documento"
                        value={formData.tipo_documento}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     >
                        <option value="DNI">DNI</option>
                        <option value="PASAPORTE">Pasaporte</option>
                        <option value="CEDULA">Cédula</option>
                        <option value="RUC">RUC</option>
                     </select>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de Documento *
                     </label>
                     <input
                        type="text"
                        name="numero_documento"
                        value={formData.numero_documento}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ingresa el número de documento"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de Usuario *
                     </label>
                     <input
                        type="text"
                        name="nombre_usuario"
                        value={formData.nombre_usuario}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nombre de usuario único"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                     </label>
                     <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nombre del cliente"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido Paterno *
                     </label>
                     <input
                        type="text"
                        name="apellido_paterno"
                        value={formData.apellido_paterno}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Apellido paterno"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido Materno
                     </label>
                     <input
                        type="text"
                        name="apellido_materno"
                        value={formData.apellido_materno}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Apellido materno (opcional)"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Nacimiento
                     </label>
                     <input
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico *
                     </label>
                     <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="correo@ejemplo.com"
                     />
                  </div>
               </div>
            </div>

            {/* Información Adicional */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
               <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Adicional</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        ¿Tiene Discapacidad?
                     </label>
                     <select
                        name="discapacidad"
                        value={formData.discapacidad}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     >
                        <option value="false">No</option>
                        <option value="true">Sí</option>
                     </select>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grado Académico
                     </label>
                     <input
                        type="text"
                        name="grado_academico"
                        value={formData.grado_academico}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ej: Bachiller, Licenciado, Magíster"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Profesión
                     </label>
                     <input
                        type="text"
                        name="profesion_id"
                        value={formData.profesion_id}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ID de la profesión"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        Colegiatura
                     </label>
                     <input
                        type="text"
                        name="colegiatura"
                        value={formData.colegiatura}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Número de colegiatura"
                     />
                  </div>
               </div>
            </div>

            {/* Teléfonos */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Teléfonos</h2>
                  <button
                     type="button"
                     onClick={agregarTelefono}
                     className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                     <PlusIcon className="w-4 h-4" />
                     Agregar Teléfono
                  </button>
               </div>

               <div className="space-y-4">
                  {telefonos.map((telefono, index) => (
                     <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                              País
                           </label>
                           <select
                              value={telefono.pais_id}
                              onChange={(e) => handleTelefonoChange(index, 'pais_id', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                              <option value={17}>Perú (+51)</option>
                              <option value={1}>Argentina (+54)</option>
                              <option value={2}>Colombia (+57)</option>
                              <option value={3}>México (+52)</option>
                           </select>
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                              Número
                           </label>
                           <input
                              type="text"
                              value={telefono.numero}
                              onChange={(e) => handleTelefonoChange(index, 'numero', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Número de teléfono"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tipo
                           </label>
                           <select
                              value={telefono.tipo}
                              onChange={(e) => handleTelefonoChange(index, 'tipo', e.target.value as 'WHATSAPP' | 'MOVIL' | 'FIJO')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                              <option value="WHATSAPP">WhatsApp</option>
                              <option value="MOVIL">Móvil</option>
                              <option value="FIJO">Fijo</option>
                           </select>
                        </div>

                        <div className="flex items-end">
                           <button
                              type="button"
                              onClick={() => eliminarTelefono(index)}
                              disabled={telefonos.length === 1}
                              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                           >
                              <TrashIcon className="w-4 h-4" />
                              Eliminar
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex items-center justify-end gap-4 pt-6">
               <a
                  href="/clientes"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
               >
                  Cancelar
               </a>
               <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
               >
                  Crear Cliente
               </button>
            </div>
         </form>
      </div>
   )
}