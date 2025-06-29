import type { Usuario } from "../types/usuarios";


export const usersData: Usuario[] = [
    {
        id: 1,   
        email: "usuario",
        name: "Usuario",
        role: "user",
        password: "usuario"       
    },
    {
        id: 2,
        email: "admin",
        name: "Admin",
        role: "admin",
        password: "admin"
    }

]