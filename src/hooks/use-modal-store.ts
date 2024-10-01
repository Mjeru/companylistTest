import { create } from 'zustand'

export type ModalType =
	| 'addCompany'
	| 'editCompany'
	| 'deleteCompany'
	| 'addEmployee'
	| 'editEmployee'
	| 'deleteEmployee'

interface ModalStore {
	type: ModalType | null
	isOpen: boolean
	data: Employee | Company | null
	onOpen: (type: ModalType, data?: Company | Employee | null) => void
	onClose: () => void
}

export const useModal = create<ModalStore>(set => ({
	type: null,
	data: null,
	isOpen: false,
	onOpen: (type, data = null) => set({ type, isOpen: true, data }),
	onClose: () => set({ type: null, isOpen: false }),
}))
