'use server'

import { z } from "zod";

const schema = z.object({
    id: z.union([z.coerce.number(), z.string().nullish()]),
    nombre: z.string().trim()
        .min(2, "Al menos debe tener 2 letra")
        .max(8, "Como máximo debe haber 8 letras"),
    edad: z.coerce.number()
        .min(13, "La edad mínima debe ser 13 años")
        .max(30, "La edad máxima debe ser 30 años"),
    telefono: z.string().trim()
        .regex(/[69]{1}[0-9]{8}/, "Escribe 9 dígitos, siendo el primero 6 (móvil) o 9 (fijo)"),
    email: z.string().email({ message: "Email no válido" }),
    fecha: z.coerce.date()
        .min(new Date("2025-01-01"), "La fecha debe estar dentro del año 2025")
        .max(new Date("2025-12-31"), "La fecha debe estar dentro del año 2025"),
    comentario: z.string().optional()
})



function validate(formData) {
    const datos = Object.fromEntries(formData.entries())

    const result = schema.safeParse(datos)
    return result
    // https://zod.dev/ERROR_HANDLING?id=zodparsedtype
    // result puede ser de 2 tipos:
    // { success: true, data: z.infer<typeof schema> } 
    // { success: false, error: issues[] }  
}


// How to (not) reset a form after a Server Action in React:
// https://www.robinwieruch.de/react-server-action-reset-form/ 
export async function realAction(prevState, formData) {

    const result = validate(formData)
    if (!result.success) {
        console.log('issues (en crudo) ', result.error.issues);
        const simplified = result.error.issues.map(issue => [issue.path[0], issue.message])
        const issues = Object.fromEntries(simplified)
        console.log('issues (cocinados) ', issues);
        return { issues, payload: formData }
    }


    try {
        // Hacemos algo (guardar en BD, enviar a API, ...) con
        result.data
        console.log('result.data ', result.data);
        return { success: 'Éxito al realizar acción' }
    } catch (error) {
        console.log("Error:", error);
        return { error }
    }
}



