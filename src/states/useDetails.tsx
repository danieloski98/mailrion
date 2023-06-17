import { create } from 'zustand'
interface UserState {
    name: string;
    email: string;
    id: string;
    setAll: (data: any) => void;
}

export const useDetails = create<UserState>()((set) => ({
    name: '',
    email: '',
    id: '',
    setAll: (data: any) => set((state) => ({ ...state, ...data }))
}))