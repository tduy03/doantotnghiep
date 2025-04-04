export interface User {
    id?: number | string
    name:string
    email: string
    password: string
}
export interface Account {
    id: string
    name: string
    email: string
    phone: string
    address: string
}
export type AccountInput = Omit<Account, 'id'>