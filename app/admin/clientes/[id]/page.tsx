export default function DetalleClientePage({ params }: { params: { id: string } }) {
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Detalle del Cliente</h1>
               <p className="text-gray-600">Cliente ID: {params.id}</p>
            </div>
            <a
               href="/admin/clientes"
               className="text-gray-600 hover:text-gray-800 font-medium"
            >
               ← Volver a clientes
            </a>
         </div>

         <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6">
               <p className="text-gray-500 text-center py-8">
                  Detalles del cliente - Próximamente
               </p>
            </div>
         </div>
      </div>
   )
}