'use client'
import { realAction } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { CircleAlert, RefreshCcw } from 'lucide-react'
import { toast } from "sonner";



function Formulario() {

    const [state, action, pending] = useActionState(realAction, {})


    useEffect(() => {
        if (state.error) toast.error(state.error)
        if (state.success) toast.success(state.success)
    }, [state])


    return (
        <form action={action} className="my-20 border-2 p-4 flex flex-col gap-2">
            <h1 className="text-center text-xl">Formulario</h1>


            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="nombre">Nombre:</label>
                <input id="nombre" name="nombre" className="ring-2"
                    // pattern="[A-Za-zÑñÁÉÍÓÚáéíóú]{2,8}"
                    // title="Mínimo 2 letras, máximo 8 letras"
                    defaultValue={state.payload?.get("nombre") || ""}  // para recuperar el valor introducido previamente
                />
            </div>
            {/* {state.issues?.nombre && state.issues.nombre} */}
            {/* Una presentación más elaborada */}
            {state.issues?.nombre &&
                < div className="text-sm font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
                    <CircleAlert className="inline m-2 size-4" /> {state.issues.nombre}
                </div>
            }



            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="edad">Edad:</label>
                <input type='number' id="edad" name="edad" className="ring-2"
                    defaultValue={state.payload?.get("edad") || ""}  // para recuperar el valor introducido previamente
                // min={18} max={65}
                />
            </div>
            {/* {state.issues?.edad && state.issues.edad} */}
            {state.issues?.edad &&
                < div className="text-sm font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
                    <CircleAlert className="inline m-2 size-4" /> {state.issues.edad}
                </div>
            }


            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="email">Email:</label>
                <input type='email' id="email" name="email" className="ring-2"
                    defaultValue={state.payload?.get("email") || ""}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.issues?.email && state.issues.email}



            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="telefono">Teléfono móvil:</label>
                <input type='tel' id="telefono" name="telefono" className="ring-2"
                    defaultValue={state.payload?.get("telefono") || ""}  // para recuperar el valor introducido previamente
                // pattern="[678]{1}[0-9]{8}"
                // title="9 dígitos, siendo el primero 6,7 u 8"
                />
            </div>
            {state.issues?.telefono && state.issues.telefono}



            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="fecha">Fecha de incidencia:</label>
                <input type="date" id="fecha" name="fecha" className="ring-2"
                    defaultValue={state.payload?.get("fecha") || new Date().toISOString().split('T')[0]}  // para recuperar el valor introducido previamente
                // min="2024-01-01" max="2024-12-31"
                />
            </div>
            {state.issues?.fecha && state.issues.fecha}



            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="comentario">Comentario:</label>
                <textarea id="comentario" name="comentario" className="ring-2"
                    defaultValue={state.payload?.get("comentario") || ""}  // para recuperar el valor introducido previamente
                />
            </div>
            {state.issues?.comentario && state.issues.comentario}



            <button
                disabled={pending}
                className="disabled:bg-slate-600 bg-blue-600 text-white rounded-lg py-2" >
                {pending ? <RefreshCcw className="inline animate-spin size-4" /> : 'Insertar'}
            </button>

        </form >
    );
}

export default Formulario;