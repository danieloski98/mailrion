import { SmtpUserModel } from 'models/SmtpUsers';
import { create } from 'zustand'
interface State {
    setAll: (data: Partial<SmtpUserModel>) => void;
}

export const useSmtpAccount = create<SmtpUserModel & State>()((set) => ({
    id: 0,
    attributes: {
        hostname: '',
        port: '',
        username: '',
        name: '',
    },
    type: '',
    setAll: (data: Partial<SmtpUserModel>) => set((state) => ({ ...state, ...data }))
}))