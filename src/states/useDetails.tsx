import { create } from 'zustand'
interface UserState {
    name: string;
    email: string;
    setAll: (data: any) => void;
}

export const useDetails = create<UserState>()((set) => ({
    name: '',
    email: '',
    setAll: (data: any) => set((state) => ({ ...state, ...data }))
}))