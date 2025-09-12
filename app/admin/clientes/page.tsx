export default function ClientesPage() {
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
               <p className="text-gray-600">Gestiona todos los clientes del sistema</p>
            </div>
            <a
               href="/admin/clientes/crear"
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
               Nuevo Cliente
            </a>
         </div>

         <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6">
               <p className="text-gray-500 text-center py-8">
                  Lista de clientes - Próximamente
               </p>
            </div>
         </div>
      </div>
   )
}