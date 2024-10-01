import { create } from 'zustand'

interface LocalStorage {
	companies: Company[]
	updateCompanies: (companies: Company[]) => void
}

export const useStorage = create<LocalStorage>(set => ({
	companies: [],
	updateCompanies: (companies: Company[]) => set({ companies }),
}))
